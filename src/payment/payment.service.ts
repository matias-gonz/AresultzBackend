import { Injectable, NotFoundException } from '@nestjs/common';
import MercadoPagoConfig, { Payment, Preference } from 'mercadopago';
import { PreferenceResponse } from 'mercadopago/dist/clients/preference/commonTypes';
import { ConfigKeys, ConfigLoader } from 'src/config/config';
import { PaymentResponse } from 'mercadopago/dist/clients/payment/commonTypes';

export type PaymentRequestResponse = {
  paymentId: string;
  initPoint: string;
};

export type PaymentInfo = {
  id: number;
  status: string;
  amount: number;
  dateCreated: string;
  dateUpdated: string | undefined;
  dateApproved: string | undefined;
  description: string | undefined;
  notificationEmail: string | undefined;
  payerEmail: string | undefined;
};

type PaymentLinkProps = {
  customerId: string;
};

@Injectable()
export class PaymentService {
  private _client: MercadoPagoConfig;

  constructor() {
    const accessToken = ConfigLoader.loadConfig(
      ConfigKeys.MercadoPagoAccessToken,
    );
    this._client = new MercadoPagoConfig({
      accessToken: accessToken,
      options: { timeout: 5000, idempotencyKey: 'mercadoPagoPayment' },
    });
  }

  async generatePaymentLink({
    customerId,
  }: PaymentLinkProps): Promise<PaymentRequestResponse> {
    const preference = new Preference(this._client);
    const response: PreferenceResponse = await preference.create({
      body: {
        items: [
          {
            id: '1',
            title: 'Dos clases de 1 hora',
            currency_id: 'MXN',
            description: 'Asesoría de matemáticas impartida por un profesional',
            quantity: 1,
            unit_price: 250,
          },
        ],
        binary_mode: true,
        notification_url: `${ConfigLoader.loadConfig(
          ConfigKeys.BaseUrl,
        )}/webhook?email=${customerId}`,
        auto_return: 'approved',
        back_urls: {
          success: 'https://anytimehelp.org/mentoring/created',
        },
      },
    });

    return {
      paymentId: response.id ?? '',
      initPoint: response.init_point ?? '',
    };
  }

  async getPayment(id: string): Promise<PaymentInfo> {
    const payment = new Payment(this._client);

    const response: PaymentResponse = await payment
      .get({ id: id })
      .catch((e) => {
        throw new NotFoundException(`${e.message}`);
      });

    const notificationEmail =
      new URL(response.notification_url ?? '').searchParams.get('email') ?? '';
    const payerEmail = response.payer?.email;

    return {
      id: response.id ?? 0,
      status: response.status ?? '',
      amount: response.transaction_amount ?? 0,
      dateCreated: response.date_created ?? '',
      dateUpdated: response.date_last_updated,
      dateApproved: response.date_approved,
      description: response.description,
      notificationEmail,
      payerEmail,
    };
  }
}

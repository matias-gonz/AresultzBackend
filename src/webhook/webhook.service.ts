import { Injectable } from '@nestjs/common';
import { ConfigKeys, ConfigLoader } from 'src/config/config';
import { MailerService } from 'src/mailer/mailer.service';

// Type extracted from https://www.mercadopago.com.mx/developers/es/docs/your-integrations/notifications/webhooks

export type MercadoPagoEventType =
  | 'payment'
  | 'plan'
  | 'subscription'
  | 'invoice'
  | 'point_integration_wh';

export type MercadoPagoPaymentAction = 'payment.created' | 'payment.updated';

export type MercadoPagoEvent = {
  id: number;
  live_mode: boolean;
  type: MercadoPagoEventType;
  date_created: string;
  user_id: number;
  api_version: 'v1';
  action: MercadoPagoPaymentAction;
  data: {
    id: string;
  };
};

@Injectable()
export class WebHookService {
  constructor(private readonly mailerService: MailerService) {}

  async handleHook(
    mercadoPagoEvent: MercadoPagoEvent,
    email: string,
  ): Promise<any> {
    if (mercadoPagoEvent.action === 'payment.created') {
      this.mailerService.sendPaymentAcceptedEmail(
        [email],
        email,
        mercadoPagoEvent.data.id,
      );
      this.mailerService.sendPaymentAcceptedEmail(
        ConfigLoader.loadConfig(ConfigKeys.NotificationEmails).split(','),
        email,
        mercadoPagoEvent.data.id,
      );
    }

    return { status: 'OK' };
  }
}

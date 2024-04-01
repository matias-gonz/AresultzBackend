import { Injectable } from '@nestjs/common';
import * as mailer from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/mail';
import { ConfigKeys, ConfigLoader } from 'src/config/config';

@Injectable()
export class MailerService {
  private readonly notificationEmails: string[];

  constructor() {
    mailer.setApiKey(ConfigLoader.loadConfig(ConfigKeys.SendGridAPIKey));
    this.notificationEmails = ConfigLoader.loadConfig(
      ConfigKeys.NotificationEmails,
    ).split(',');
  }

  async sendConfirmationEmail(contactEmail: string) {
    const data: MailDataRequired = {
      to: contactEmail,
      from: 'contacto@aresultz.com',
      subject: 'Solicitud de asesoría recibida',
      text: `¡Muchas gracias!\n
Hemos recibido tu solicitud de asesoría y se han notificado a los profesores.\n

Te contactaremos a la brevedad con más información.
      `,
    };

    await this.sendEmail(data);
  }

  async sendRequestAlertEmail(
    contactEmail: string,
    comments: string,
    subject: string,
    phone: string,
  ) {
    const data: MailDataRequired = {
      to: this.notificationEmails,
      from: 'contacto@aresultz.com',
      subject: 'Hemos recibido una solicitud de asesoría!!!!',
      text: `Hemos recibido una solicitud de asesoría de ${contactEmail}\n
El alumno dejó su número de teléfono: ${phone}\n
El alumno seleccionó la asignatura: ${subject}\n
Y ha escrito lo siguiente:\n
${comments}\n
      `,
    };

    await this.sendEmail(data);
  }

  async sendPaymentAcceptedEmail(
    to: string[],
    clientEmail: string,
    paymentId: string,
  ) {
    const data: MailDataRequired = {
      to,
      from: 'anytimehelp@panthera.ar',
      subject: `Confirmación del pago #${paymentId} para el pedido de ${clientEmail}`,
      text: `Hemos recibido una confirmación de pago para el pedido de ${clientEmail}\n
El id de pago es ${paymentId} y lo puedes verificar en el siguiente link: https://anytimehelp.org/payment/${paymentId}\n
Nos comunicaremos contigo para la asesoría lo más pronto posible.
`,
    };
    await this.sendEmail(data);
  }

  private async sendEmail(data: MailDataRequired) {
    if (ConfigLoader.isDev()) {
      console.log('Fake sending email with data', data);
      return;
    }
    await mailer.send(data);
  }
}

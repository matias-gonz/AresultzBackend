export enum ConfigKeys {
  Message = 'MESSAGE',
  MercadoPagoAccessToken = 'MERCADO_PAGO_ACCESS_TOKEN',
  SendGridAPIKey = 'SENDGRID_API_KEY',
  NotificationEmails = 'NOTIFICATION_EMAILS',
  Mode = 'MODE',
  BaseUrl = 'BASE_URL',
  FirebaseProjectId = 'FIREBASE_PROJECT_ID',
  FirebasePrivateKey = 'FIREBASE_PRIVATE_KEY',
  FirebaseClientEmail = 'FIREBASE_CLIENT_EMAIL',
}

export class ConfigLoader {
  static loadConfig = (key: ConfigKeys): string => {
    return process.env[key] ?? '';
  };

  static isDev = () => {
    const mode = process.env[ConfigKeys.Mode];
    return !['staging', 'production'].includes(mode ?? 'dev');
  };
}

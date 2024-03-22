import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WebHookController } from './webhook/webhooks.controller';
import { WebHookService } from './webhook/webhook.service';
import { MentoringService } from './mentoring/mentoring.service';
import { MentoringController } from './mentoring/mentoring.controller';
import { PaymentController } from './payment/payment.controller';
import { PaymentService } from './payment/payment.service';
import { MailerService } from './mailer/mailer.service';
import { FirebaseService } from './firebase/firebase.service';
import { TeacherService } from './teacher/teacher.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  controllers: [
    AppController,
    MentoringController,
    PaymentController,
    WebHookController,
  ],
  providers: [
    AppService,
    MentoringService,
    PaymentService,
    MailerService,
    WebHookService,
    FirebaseService,
    TeacherService,
  ],
})
export class AppModule {}

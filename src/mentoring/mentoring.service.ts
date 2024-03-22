import { Injectable } from '@nestjs/common';
import {
  PaymentRequestResponse,
  PaymentService,
} from 'src/payment/payment.service';
import { MailerService } from 'src/mailer/mailer.service';
import {
  FirebaseCollection,
  FirebaseService,
} from 'src/firebase/firebase.service';
import { CollectionReference } from 'firebase-admin/firestore';
import { Mentoring } from './mentoring.model';
import { Subject } from 'src/teacher/teacher.model';

export type MentoringRequest = {
  description: string;
  contactEmail: string;
  category: string;
};

@Injectable()
export class MentoringService {
  private _mentorings: CollectionReference;

  constructor(
    private readonly paymentService: PaymentService,
    private readonly mailerService: MailerService,
    private readonly firebaseService: FirebaseService,
  ) {
    this._mentorings = this.firebaseService.getCollection(
      FirebaseCollection.Mentoring,
    );
  }

  async generateMentoring(
    mentoringRequest: MentoringRequest,
  ): Promise<PaymentRequestResponse> {
    this.createMentoring(mentoringRequest);

    const paymentLink = await this.paymentService.generatePaymentLink({
      customerId: mentoringRequest.contactEmail,
    });

    this.mailerService.sendConfirmationEmail(
      mentoringRequest.contactEmail,
      paymentLink.initPoint,
    );

    this.mailerService.sendRequestAlertEmail(
      mentoringRequest.contactEmail,
      mentoringRequest.description,
      mentoringRequest.category,
    );

    return paymentLink;
  }

  private async createMentoring(
    mentoringRequest: MentoringRequest,
  ): Promise<Mentoring> {
    const mentoring: Mentoring = {
      available: true,
      contactEmail: mentoringRequest.contactEmail,
      createdAt: new Date().toISOString(),
      description: mentoringRequest.description,
      subject: mentoringRequest.category as Subject,
    };
    await this._mentorings.add(mentoring);
    return mentoring;
  }
}

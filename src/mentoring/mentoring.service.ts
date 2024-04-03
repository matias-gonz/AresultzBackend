import { Injectable } from '@nestjs/common';
import { MailerService } from 'src/mailer/mailer.service';
import { Mentoring } from './mentoring.model';
import { Subject } from 'src/teacher/teacher.model';

export type MentoringRequest = {
  comments: string;
  email: string;
  selectedCourse: string;
  phone: string;
};

@Injectable()
export class MentoringService {
  constructor(private readonly mailerService: MailerService) {}

  async generateMentoring(
    mentoringRequest: MentoringRequest,
  ): Promise<Mentoring> {
    const mentoring = this.createMentoring(mentoringRequest);

    await this.mailerService
      .sendConfirmationEmail(mentoringRequest.email)
      .then((data) =>
        console.log('data from sendgrid in confirmation is', data),
      )
      .catch((err) =>
        console.log('Error from sendgrid in confirmation is', err),
      );

    await this.mailerService
      .sendRequestAlertEmail(
        mentoringRequest.email,
        mentoringRequest.comments,
        mentoringRequest.selectedCourse,
        mentoringRequest.phone,
      )
      .then((data) =>
        console.log('data from sendgrid in request alert is', data),
      )
      .catch((err) =>
        console.log('Error from sendgrid in request alert is', err),
      );

    return mentoring;
  }

  private createMentoring(mentoringRequest: MentoringRequest): Mentoring {
    return {
      available: true,
      contactEmail: mentoringRequest.email,
      createdAt: new Date().toISOString(),
      description: mentoringRequest.comments,
      subject: mentoringRequest.selectedCourse as Subject,
    };
  }
}

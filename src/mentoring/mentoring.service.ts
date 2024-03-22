import { Injectable } from '@nestjs/common';
import { MailerService } from 'src/mailer/mailer.service';
import { Mentoring } from './mentoring.model';
import { Subject } from 'src/teacher/teacher.model';

export type MentoringRequest = {
  comments: string;
  email: string;
  subject: string;
  phone?: string;
};

@Injectable()
export class MentoringService {
  constructor(private readonly mailerService: MailerService) {}

  async generateMentoring(
    mentoringRequest: MentoringRequest,
  ): Promise<Mentoring> {
    const mentoring = this.createMentoring(mentoringRequest);

    this.mailerService.sendConfirmationEmail(mentoringRequest.email);

    this.mailerService.sendRequestAlertEmail(
      mentoringRequest.email,
      mentoringRequest.comments,
      mentoringRequest.subject,
    );

    return mentoring;
  }

  private createMentoring(mentoringRequest: MentoringRequest): Mentoring {
    return {
      available: true,
      contactEmail: mentoringRequest.email,
      createdAt: new Date().toISOString(),
      description: mentoringRequest.comments,
      subject: mentoringRequest.subject as Subject,
    };
  }
}

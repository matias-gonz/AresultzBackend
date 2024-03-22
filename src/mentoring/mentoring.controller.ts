import { Body, Controller, Post } from '@nestjs/common';
import { MentoringRequest, MentoringService } from './mentoring.service';
import { PaymentRequestResponse } from 'src/payment/payment.service';

@Controller()
export class MentoringController {
  constructor(private readonly mentoringService: MentoringService) {}

  @Post('/mentoring')
  async postMentoring(
    @Body() request: MentoringRequest,
  ): Promise<PaymentRequestResponse> {
    return await this.mentoringService.generateMentoring(request);
  }
}

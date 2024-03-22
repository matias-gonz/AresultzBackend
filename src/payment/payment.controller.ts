import { Controller, Get, Param } from '@nestjs/common';
import { PaymentInfo, PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('/payment/:id')
  async getPayment(@Param('id') id?: string): Promise<PaymentInfo> {
    return this.paymentService.getPayment(id ?? '');
  }
}

import { Body, Controller, Post, Query } from '@nestjs/common';
import { MercadoPagoEvent, WebHookService } from './webhook.service';
@Controller()
export class WebHookController {
  constructor(private readonly webHookService: WebHookService) {}

  @Post('/webhook')
  async getTestPayment(
    @Body() mercadoPagoEvent: MercadoPagoEvent,
    @Query('email') email?: string,
  ): Promise<any> {
    return await this.webHookService.handleHook(mercadoPagoEvent, email ?? '');
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { MentoringRequest, MentoringService } from './mentoring.service';
import { Mentoring } from './mentoring.model';

@Controller()
export class MentoringController {
  constructor(private readonly mentoringService: MentoringService) {}

  @Post('/mentoring')
  async postMentoring(@Body() request: MentoringRequest): Promise<Mentoring> {
    return await this.mentoringService.generateMentoring(request);
  }
}

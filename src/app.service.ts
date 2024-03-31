import { Injectable } from '@nestjs/common';
import { ConfigKeys, ConfigLoader } from './config/config';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getMessage(): string {
    const message = ConfigLoader.loadConfig(ConfigKeys.Message);
    return 'Welcome to staging aresultz, ' + message;
  }
}

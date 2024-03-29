import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const isProduction = process.env.MODE === 'production';

  const allowedOrigins =
    process.env.MODE === 'production'
      ? ['https://aresultz.com']
      : ['http://localhost:5173', 'https://staging.aresultz.com'];

  app.enableCors({
    origin: (origin: string, callback) => {
      console.log('allowed are', allowedOrigins, 'this one is', origin);
      if (!isProduction || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || '3000';
  await app.listen(parseInt(port));

  console.log('Server is listening on http://localhost:' + port);
  console.log('In mode', process.env.MODE);
}
bootstrap();

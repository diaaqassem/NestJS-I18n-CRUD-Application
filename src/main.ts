import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  const logger: Logger = new Logger('NestApplication');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: false,
  });
  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT') || 3000;

  // Use the built-in `ValidationPipe` for DTO validation and use nestjs-i18n in your DTO validation in same time
  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Handle the rejection, log it, or send it to an error tracking service
  });

  process.on('uncaughtException', (error: Error) => {
    console.error('Uncaught Exception:', error);
    // Handle the exception, log it, or send it to an error tracking service
    process.exit(1); // You may want to shut down the application for critical errors
  });

  await app.listen(port, () => {
    console.log('listening on port ' + port);
    logger.log(
      `NestJS server started on port ${port}\n${configService.get<string>(
        'APP_URL',
      )}`,
    );
  });
}

bootstrap();

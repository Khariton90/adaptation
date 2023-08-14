import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from "@nestjs/config";
import { getRabbitMqConfig } from "./app/config/rabbitmq.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.connectMicroservice(getRabbitMqConfig(configService));
  await app.startAllMicroservices();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3334;
  await app.listen(port);
  Logger.log(
    `🚀 REST is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

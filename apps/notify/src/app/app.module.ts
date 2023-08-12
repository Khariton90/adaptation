import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { ConfigModule } from "@nestjs/config";
import { rabbitMqOptions } from "./config/rabbitmq.config";
import { getMongoDbConfig, mongoDbOptions } from "./config/mongodb.config";
import { MongooseModule } from "@nestjs/mongoose";
import envSchema from "./env.schema";
import { NOTIFY_SERVICE_ENV_PATH } from "./app.constant";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: NOTIFY_SERVICE_ENV_PATH,
      validationSchema: envSchema,
      load: [rabbitMqOptions, mongoDbOptions]
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    EmailSubscriberModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

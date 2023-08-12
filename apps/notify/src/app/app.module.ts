import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { ConfigModule } from '@nestjs/config';
import { rabbitMqOptions } from './config/rabbitmq.config';
import { getMongoDbConfig, mongoDbOptions } from './config/mongodb.config';
import { MongooseModule } from '@nestjs/mongoose';
import envSchema from './env.schema';
import { NOTIFY_SERVICE_ENV_PATH } from './app.constant';
import { MailModule } from './mail/mail.module';
import { mailOptions } from "./config/mail.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: NOTIFY_SERVICE_ENV_PATH,
      validationSchema: envSchema,
      load: [rabbitMqOptions, mongoDbOptions, mailOptions],
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    EmailSubscriberModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

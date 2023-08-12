import { Module } from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberController } from './email-subscriber.controller';
import { EmailSubscriberRepository } from "./email-subscriber.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { EmailSubscriberModel, EmailSubscriberSchema } from "./email-subscriber.model";
import { MailService } from "../mail/mail.service";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema }
    ]),
    MailModule
  ],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository,
    MailService
  ],
  controllers: [EmailSubscriberController],
})
export class EmailSubscriberModule { }

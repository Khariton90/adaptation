import { Module } from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberController } from './email-subscriber.controller';
import { EmailSubscriberRepository } from "./email-subscriber.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { EmailSubscriberModel, EmailSubscriberSchema } from "./email-subscriber.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema }
    ]),
  ],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository
  ],
  controllers: [EmailSubscriberController],
})
export class EmailSubscriberModule { }

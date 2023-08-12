import { BadRequestException, Injectable } from '@nestjs/common';
import { EmailSubscriberRepository } from "./email-subscriber.repository";
import { CreateSubscriberDto } from "./dto/create-subscriber.dto";
import { EmailSubscriberEntity } from "./email-subscriber.entity";
import { MailService } from "../mail/mail.service";

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly mailService: MailService,
  ) {}

  async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existSubscriber) {
      throw new BadRequestException('This subscriber exists')
    }

    const newSubscriber = this.emailSubscriberRepository.create(new EmailSubscriberEntity(subscriber));
    this.mailService.sendNotifyNewSubscriber(subscriber);
    return newSubscriber;
  }
}

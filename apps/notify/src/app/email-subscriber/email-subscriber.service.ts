import { BadRequestException, Injectable } from '@nestjs/common';
import { EmailSubscriberRepository } from "./email-subscriber.repository";
import { CreateSubscriberDto } from "./dto/create-subscriber.dto";
import { EmailSubscriberEntity } from "./email-subscriber.entity";

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {}

  async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existSubscriber) {
      throw new BadRequestException('This subscriber exists')
    }

    return this.emailSubscriberRepository.create(new EmailSubscriberEntity(subscriber));
  }
}

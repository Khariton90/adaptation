import { MailerService } from "@nestjs-modules/mailer";
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Subscriber } from "@org/shared-types";
import { EMAIL_ADD_SUBSCRIBER_SUBJECT } from "./mail.constant";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: '../assets/add-subscriber',
      context: {
        user: `${subscriber.firstname}`,
        email: `${subscriber.email}`,
        password: `${subscriber.password}`
      },
    }).catch((err) => {
      throw new HttpException(
        `Ошибка работы почты: ${JSON.stringify(err)}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    })
  }
}

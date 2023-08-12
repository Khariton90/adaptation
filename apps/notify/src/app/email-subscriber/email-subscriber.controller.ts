import { Controller } from '@nestjs/common';
import { EmailSubscriberService } from "./email-subscriber.service";
import { EventPattern } from "@nestjs/microservices";
import { CommandEvent } from "@org/shared-types";
import { CreateSubscriberDto } from "./dto/create-subscriber.dto";

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly emailSubscriberService: EmailSubscriberService
  ) { }

  @EventPattern({ cmd: CommandEvent.AddSubscriber })
  public async create(subscriber: CreateSubscriberDto) {
    return this.emailSubscriberService.addSubscriber(subscriber);
  }
}

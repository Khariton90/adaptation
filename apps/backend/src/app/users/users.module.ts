import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { UsersSchema, UsersModel } from "./users.model";
import { UsersRepository } from "./users.repository";
import { ClientsModule } from "@nestjs/microservices";
import { getRabbitMqConfig } from "../config/rabbitmq.config";
import { ConfigService } from "@nestjs/config";
import { RABBITMQ_SERVICE } from "../app.constant";

@Module({
  imports: [
    MongooseModule.forFeature([
    {name: UsersModel.name, schema: UsersSchema}
  ]),
  ClientsModule.registerAsync([
    {
      name: RABBITMQ_SERVICE,
      useFactory: getRabbitMqConfig,
      inject: [ConfigService],
    }
  ])
]
  ,
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}

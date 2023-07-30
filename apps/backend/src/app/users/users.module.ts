import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { UsersSchema, UsersModel } from "./users.model";
import { UsersRepository } from "./users.repository";

@Module({
  imports: [MongooseModule.forFeature([
    {name: UsersModel.name, schema: UsersSchema}
  ])],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}

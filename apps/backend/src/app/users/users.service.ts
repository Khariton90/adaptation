import dayjs from "dayjs";
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserRole } from "@org/shared-types";
import { UsersEntity } from "./users.entity";

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository
  ) {}

  public async find() {
    return await this.usersRepository.find();
  }

  public async create({firstname, lastname, email, jobTitle, startDate, avatar}: CreateUserDto) {
    const user = {
      firstname,
      lastname,
      avatar:  avatar ? `http://localhost:3333/api/users/avatar/${avatar}` : `http://localhost:3333/api/users/avatar/default-avatar.svg`,
      email,
      jobTitle,
      userRole: UserRole.User,
      status: 1,
      startDate: dayjs(startDate).toISOString()
    }

    const existUser = await this.usersRepository.findByEmail(email);

    if (existUser) {
      throw new BadRequestException(`User with this email ${email} already exists`)
    }

    const userEntity = new UsersEntity(user);
    const newUser = await this.usersRepository.create(userEntity);

    return newUser;
  }
}

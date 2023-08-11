import dayjs from "dayjs";
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserRole } from "@org/shared-types";
import { UsersEntity } from "./users.entity";
import { generatePassword } from "@org/core";

const DEFAULT_URL_AVATAR = "http://31.184.253.16:3333/api/users/avatar/default-avatar.svg";

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository
  ) {}

  public async find() {
    return await this.usersRepository.find();
  }

  public async findById(id: string) {
    const existUser = await this.usersRepository.findById(id);

    if (!existUser) {
      return new NotFoundException(`User with data ID ${id} was not found`);
    }

    return existUser;
  }

  public async findByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }

  public async create({firstname, lastname, email, jobTitle, startDate, avatar}: CreateUserDto) {
    const password = generatePassword();

    const user = {
      firstname,
      lastname,
      avatar:  avatar ? avatar : DEFAULT_URL_AVATAR,
      email,
      jobTitle,
      userRole: UserRole.User,
      status: 1,
      startDate: dayjs(startDate).toISOString(),
      password: password,
    }

    const existUser = await this.usersRepository.findByEmail(email);

    if (existUser) {
      throw new BadRequestException(`User with this email ${email} already exists`)
    }

    const userEntity = await new UsersEntity(user).setPassword(user.password);
    const newUser = await this.usersRepository.create(userEntity);
    Logger.log(`email: ${email} password: ${password}`);
    return newUser;
  }

  public async deleteUser(id: string) {
    return await this.usersRepository.destroy(id);
  }
}


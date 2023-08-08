import dayjs from "dayjs";
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserRole } from "@org/shared-types";
import { UsersEntity } from "./users.entity";
import { CLIENT_URL } from "../app.constant";
import { generatePassword } from "@org/core";

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
    const user = {
      firstname,
      lastname,
      avatar:  avatar ? `${CLIENT_URL}api/users/avatar/${avatar}` : `${CLIENT_URL}api/users/avatar/default-avatar.svg`,
      email,
      jobTitle,
      userRole: UserRole.User,
      status: 1,
      startDate: dayjs(startDate).toISOString(),
      password: generatePassword(),
    }

    const existUser = await this.usersRepository.findByEmail(email);

    if (existUser) {
      throw new BadRequestException(`User with this email ${email} already exists`)
    }

    const userEntity = new UsersEntity(user);
    const newUser = await this.usersRepository.create(userEntity);
    return newUser;
  }

  public async deleteUser(id: string) {
    return await this.usersRepository.destroy(id);
  }
}

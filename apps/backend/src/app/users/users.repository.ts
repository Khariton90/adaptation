import { CRUDRepository } from "@org/core";
import { UsersEntity } from "./users.entity";
import { User } from "@org/shared-types";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UsersModel } from "./users.model";
import { Model } from "mongoose";

@Injectable()
export class UsersRepository implements CRUDRepository<UsersEntity, string, User> {
  constructor(
    @InjectModel(UsersModel.name) private readonly usersModel: Model<UsersModel>,
  ) {}

  public async find(): Promise<User[] | []> {
    return await this.usersModel.find().sort({createdAt: 'desc'}).exec();
  }
  
  public async findByEmail(email: string): Promise<User> {
    return await this.usersModel.findOne({email});
  }
  
  public async findById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  
  public async create(item: UsersEntity): Promise<User> {
    const newUser = new this.usersModel(item);
    return await newUser.save();
  }
  
  public async update(id: string, item: UsersEntity): Promise<User> {
    throw new Error("Method not implemented.");
  }
  
  public async destroy(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}
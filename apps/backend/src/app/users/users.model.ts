import { Document } from 'mongoose';
import { JobTitle, User, UserRole } from "@org/shared-types";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: "users",
  timestamps: true,
  versionKey: false
})
export class UsersModel extends Document implements User {
  @Prop({
    required: true
  })
  public firstname: string;

  @Prop({
    required: true
  })
  public lastname: string;

  @Prop({
    required: true
  })
  public avatar: string;

  @Prop({
    required: true,
    unique: true
  })
  public email: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.User
  })
  public userRole: UserRole;

  @Prop({
    required: true,
    type: String,
    enum: JobTitle,
    default: JobTitle.AssistLeader
  })
  public jobTitle: JobTitle;

  @Prop({
    type: Number
  })
  public status: number;

  @Prop({
    required: true
  })
  public startDate: string;

  @Prop({
    required: true
  })
  public password: string;
}

export const UsersSchema = SchemaFactory.createForClass(UsersModel);
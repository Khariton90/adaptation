import { JobTitle } from "@org/shared-types";
import { Expose } from "class-transformer";
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @Expose()
  @IsString()
  firstname: string;

  @Expose()
  @IsString()
  lastname: string;

  @Expose()
  @IsString()
  avatar: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  jobTitle: JobTitle;

  @Expose()
  startDate: string;
}
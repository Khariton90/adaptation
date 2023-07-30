
import { JobTitle } from "@org/shared-types";
import { Expose, Transform } from "class-transformer";
import { IsEmail, IsString } from 'class-validator';

export class UserRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  id: string;

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
  status: number;

  @Expose()
  startDate: string;
}
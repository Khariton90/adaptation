import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginUserDto {
  @ApiProperty({
    description: 'Unique email',
    example: 'user@mail.ru'
  })
  @IsEmail({}, {message: 'Email is not valid'})
  public email: string;

  @ApiProperty({
    description: 'user password',
    example: '7hbSBuB7'
  })
  @IsString()
  public password: string;
}
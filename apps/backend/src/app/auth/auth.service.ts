import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from "../users/users.service";
import { UsersEntity } from "../users/users.entity";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    const validPassword = await new UsersEntity(user).comparePassword(pass);

    if (!validPassword) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user._id,
      email: user.email,
      role: user.userRole
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}

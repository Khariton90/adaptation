import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { ExtendedUserRequest } from "@org/shared-types";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthGuard } from "./guards/auth.guard";

@ApiTags('The «Auth» service')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const {password, email} = dto;
    return await this.authService.signIn(email, password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  public async getProfile(@Req() req: ExtendedUserRequest) {
    return req.user;
  }
}

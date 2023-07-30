import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { fillObject } from "@org/core";
import { UserRdo } from "./rdo/user.rdo";
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';

type File = Express.Multer.File;

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @Get('/all')
  public async findAllUsers() {
    const userList = await this.usersService.find();
    return fillObject(UserRdo, userList);
  }

  @Post('create-user')
  public async create(@Body() dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    return fillObject(UserRdo, user);
  }

  @Get('avatar/:filename')
  public async getAvatar(@Param('filename') filename: string, @Res() res) {
    res.sendFile(filename, { root: './apps/public' });
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './apps/public',
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(null, false);
      }

      cb(null, true);
    }
  }))
  async uploadImage(@UploadedFile() file: File) {
    const response = `${"http://localhost:3333/api/users/avatar/"}${file.filename}`
    return response;
  }
}

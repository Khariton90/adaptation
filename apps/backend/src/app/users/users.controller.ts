import { CheckMongoidValidationPipe } from "./../pipes/check-mongo-id-validation.pipe";
import { Body, Controller, Delete, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { fillObject } from "@org/core";
import { UserRdo } from "./rdo/user.rdo";
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { CLIENT_URL } from "../app.constant";
import { ApiTags } from "@nestjs/swagger";

type File = Express.Multer.File;

@ApiTags('The «Users»')
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

  @Get('/:id')
  public async getUser(@Param('id', CheckMongoidValidationPipe) id: string) {
    const user = await this.usersService.findById(id);
    return fillObject(UserRdo, user);
  }

  @Delete('/delete/:id')
  public async deleteUser(@Param('id', CheckMongoidValidationPipe) id: string) {
    return await this.usersService.deleteUser(id);
  }

  @Get('avatar/:filename')
  public async getAvatar(@Param('filename') filename: string, @Res() res) {
    res.sendFile(filename, { root: './assets' });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './assets',
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
    const response = `${CLIENT_URL}"/api/users/avatar/"${file.filename}`
    return response;
  }
}

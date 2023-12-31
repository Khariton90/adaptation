import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ENV_FILE_PATH } from './app.constant';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbConfig, mongoDbOptions } from './config/mongodb.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import envSchema from './env.schema';
import { rabbitMqOptions } from "./config/rabbitmq.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      validationSchema: envSchema,
      load: [mongoDbOptions, rabbitMqOptions],
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

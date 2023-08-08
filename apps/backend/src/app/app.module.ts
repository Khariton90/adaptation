import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ENV_FILE_PATH } from './app.constant';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbConfig } from './config/mongodb.config';
import { UsersModule } from './users/users.module';
import envSchema from './env.schema';
import databaseConfig from './config/database.config';
import { FrontendMiddleware } from "./middlewares/frontend-middlewate";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      validationSchema: envSchema,
      load: [databaseConfig],
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(frontEnd: MiddlewareConsumer) {
    frontEnd.apply(FrontendMiddleware).forRoutes({
      path: '/**', // For all routes
      method: RequestMethod.ALL, // For all methods
    });
  }
}

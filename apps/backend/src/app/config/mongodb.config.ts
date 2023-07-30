import { ConfigService, registerAs } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";

export function getMongoConnectionString({ username, password, host, port, databaseName, authDatabase }): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export const mongoDbOptions = registerAs('database', () => ({
  name: process.env.MONGO_DB,
  host: process.env.MONGO_HOST,
  port: parseInt(process.env.MONGO_PORT, 10),
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  authBase: process.env.MONGO_AUTH_BASE,
}));

export function getMongoDbConfig(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => ({
      uri: getMongoConnectionString({
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        databaseName: configService.get('database.name'),
        authDatabase: configService.get('database.authBase'),
      })
    }),
    inject: [ConfigService]
  }
}
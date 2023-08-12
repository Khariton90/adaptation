import { ConfigService } from '@nestjs/config/dist/config.service';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { registerAs } from '@nestjs/config';
import * as path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const mailOptions = registerAs('mail', () => ({
  host: process.env.MAIL_SMTP_HOST,
  port: process.env.MAIL_SMTP_PORT,
  user: process.env.MAIL_USER_NAME,
  password: process.env.MAIL_USER_PASSWORD,
  from: process.env.MAIL_FROM,
}))

export function getMailConfig(): MailerAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => ({
      transport: {
        host: configService.get<string>('mail.host'),
        secure: true,
        port: configService.get<number>('mail.port'),
        auth: {
            user: configService.get<string>('mail.user'),
            pass: configService.get<string>('mail.password'),
        },
      },
      defaults: {
        from: configService.get<string>('mail.from'),
      },
      template: {
        dir: path.resolve(__dirname, 'assets'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    }),
    inject: [ConfigService],
  }
}
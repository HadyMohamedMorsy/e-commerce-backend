import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import emailConfig from "../config/email.config";
import { EmailService } from "./email.service";

@Module({
  imports: [
    ConfigModule.forFeature(emailConfig),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (emailConfiguration: any) => ({
        transport: {
          host: emailConfiguration.transport.host,
          port: emailConfiguration.transport.port,
          secure: emailConfiguration.transport.secure,
          auth: {
            user: emailConfiguration.transport.auth.user,
            pass: emailConfiguration.transport.auth.pass,
          },
        },
        defaults: {
          from: emailConfiguration.defaults.from,
        },
      }),
      inject: [emailConfig.KEY],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}

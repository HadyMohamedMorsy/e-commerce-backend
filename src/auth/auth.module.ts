import { Global, Module, forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { JwtModule } from "@nestjs/jwt";
import { EmailModule } from "src/shared/services/email.module";
import { UserModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import googleOAuthConfig from "./config/google-oauth.config";
import jwtConfig from "./config/jwt.config";
import { PasswordResetToken } from "./entities/password-reset-token.entity";
import { AuthService } from "./providers/auth.service";
import { BcryptProvider } from "./providers/bcrypt.provider";
import { GenerateTokensProvider } from "./providers/generate-tokens.provider";
import { GoogleOAuthProvider } from "./providers/google-oauth.provider";
import { HashingProvider } from "./providers/hashing.provider";
import { PasswordResetProvider } from "./providers/password-reset.provider";
import { RefreshTokensProvider } from "./providers/refresh-tokens.provider";
import { SignInProvider } from "./providers/sign-in.provider";
import { GoogleOAuthStrategy } from "./strategies/google-oauth.strategy";

@Global()
@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    SignInProvider,
    GenerateTokensProvider,
    RefreshTokensProvider,
    PasswordResetProvider,
    GoogleOAuthProvider,
    GoogleOAuthStrategy,
  ],
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => EmailModule),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(googleOAuthConfig),
    PassportModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    TypeOrmModule.forFeature([PasswordResetToken]),
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}

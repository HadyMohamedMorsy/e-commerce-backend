import { Inject, Injectable, UnauthorizedException, forwardRef } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/user.service";
import jwtConfig from "../config/jwt.config";
import { FacebookOAuthCallbackDto } from "../dtos/facebook-oauth.dto";
import { ForgetPasswordDto } from "../dtos/forget-password.dto";
import { GoogleOAuthCallbackDto } from "../dtos/google-oauth.dto";
import { ResetPasswordDto } from "../dtos/reset-password.dto";
import { SignInDto } from "../dtos/signin.dto";
import { ActiveUserData } from "../interfaces/active-user-data.interface";
import { FacebookOAuthProvider } from "./facebook-oauth.provider";
import { GoogleOAuthProvider } from "./google-oauth.provider";
import { PasswordResetProvider } from "./password-reset.provider";
import { SignInProvider } from "./sign-in.provider";

@Injectable()
export class AuthService {
  constructor(
    // Injecting UserService
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,

    /**
     * Inject the signInProvider
     */
    private readonly signInProvider: SignInProvider,

    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly passwordResetProvider: PasswordResetProvider,

    private readonly googleOAuthProvider: GoogleOAuthProvider,

    private readonly facebookOAuthProvider: FacebookOAuthProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  public async refreshToken(refreshToken: { refreshToken: string }) {
    return await this.signInProvider.refreshToken(refreshToken);
  }

  public async verifyToken(token: string) {
    const payload = await this.jwtService.verifyAsync<ActiveUserData>(token, {
      secret: this.jwtConfiguration.secret,
      audience: this.jwtConfiguration.audience,
      issuer: this.jwtConfiguration.issuer,
    });

    const user = await this.usersService.findOne(payload.sub, {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
    });
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    return {
      valid: true,
      user,
    };
  }

  public async forgetPassword(forgetPasswordDto: ForgetPasswordDto): Promise<void> {
    await this.passwordResetProvider.generateResetToken(forgetPasswordDto.email);
  }

  public async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    await this.passwordResetProvider.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.newPassword,
    );
  }

  public async validateResetToken(token: string): Promise<boolean> {
    return await this.passwordResetProvider.validateResetToken(token);
  }

  public async googleOAuthLogin(googleData: GoogleOAuthCallbackDto) {
    const user = await this.googleOAuthProvider.validateGoogleUser(googleData);
    return await this.googleOAuthProvider.generateTokensForGoogleUser(user);
  }

  public async facebookOAuthLogin(facebookData: FacebookOAuthCallbackDto) {
    const user = await this.facebookOAuthProvider.validateFacebookUser(facebookData);
    return await this.facebookOAuthProvider.generateTokensForFacebookUser(user);
  }
}

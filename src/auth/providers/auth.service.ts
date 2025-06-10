import { Inject, Injectable, UnauthorizedException, forwardRef } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/user.service";
import jwtConfig from "../config/jwt.config";
import { SignInDto } from "../dtos/signin.dto";
import { ActiveUserData } from "../interfaces/active-user-data.interface";
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
  ) {}

  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  public async refreshToken(refreshToken: { refreshToken: string }) {
    return await this.signInProvider.refreshToken(refreshToken);
  }

  public async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync<ActiveUserData>(token, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const user = await this.usersService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      return {
        valid: true,
        user,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}

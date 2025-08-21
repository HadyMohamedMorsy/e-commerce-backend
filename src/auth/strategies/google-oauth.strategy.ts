import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import googleOAuthConfig from "../config/google-oauth.config";

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    @Inject(googleOAuthConfig.KEY)
    private readonly googleOAuthConfiguration: ConfigType<typeof googleOAuthConfig>,
  ) {
    super({
      clientID: googleOAuthConfiguration.clientID,
      clientSecret: googleOAuthConfiguration.clientSecret,
      callbackURL: googleOAuthConfiguration.callbackURL,
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, emails, name, photos } = profile;

    const user = {
      googleId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      avatar: photos[0].value,
      accessToken,
    };

    done(null, user);
  }
}

import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '281588793035-vftdot5u6pkfde4eooadvdl4ao3publv.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    return {};
  }
}

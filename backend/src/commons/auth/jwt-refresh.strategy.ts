import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const cookies = cookie.split(';');
        const [filterRefreshToken] = cookies.filter((el) =>
          el.includes('refreshToken'),
        );
        const refreshToken = filterRefreshToken
          .trim()
          .replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: process.env.REFRESH_TOKEN_KEY,
    });
  }

  validate(payload) {
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}

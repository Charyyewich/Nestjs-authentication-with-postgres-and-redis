import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: `${process.env.jwt_secret}`,
      });
  }

  async validate(payload: { sub: string; username: string; id: string; refreshToken: string }): 
  Promise<{ user: string; username: string; id: string; refreshToken: string }> 
  {
    return { user: payload.sub, username: payload.username, id: payload.id, refreshToken: payload.refreshToken };
  }
}

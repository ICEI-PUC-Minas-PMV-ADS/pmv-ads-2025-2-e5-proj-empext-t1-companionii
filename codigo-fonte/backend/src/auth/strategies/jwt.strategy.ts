import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(cfg: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: cfg.get<string>('JWT_SECRET') as string,
    });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(payload: any): Promise<any> {
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}

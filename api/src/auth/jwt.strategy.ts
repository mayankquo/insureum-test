import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from 'src/config/config.service';
import { UserService } from 'src/user/user.service';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.getValue(
          'AUTH0_ISSUER_URL',
        )}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: `${configService.getValue('AUTH0_ISSUER_URL')}`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    return this.userService.getUserByEmail(payload.email);
  }
}

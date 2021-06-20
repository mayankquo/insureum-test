import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    TypeOrmModule.forFeature([User, UserRepository]),
  ],
  providers: [ConfigService, JwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}

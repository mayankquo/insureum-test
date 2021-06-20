import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import { CoreModule } from './core/core.module';
import { NetworkModule } from './network/network.module';
import { PolicyModule } from './policy/policy.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ConfigService,
    }),
    CoreModule,
    NetworkModule,
    PolicyModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

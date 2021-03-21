import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ConfigService,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(){
    console.log('AppModule')
  }
 }

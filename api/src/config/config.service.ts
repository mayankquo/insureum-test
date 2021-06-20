import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory {
  envConfig: any;

  constructor() {
    this.envConfig = dotenv.parse(fs.readFileSync('.env'));
  }

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.envConfig.DB_HOST,
      port: this.envConfig.DB_PORT,
      username: this.envConfig.DB_USER,
      password: this.envConfig.DB_PASSWORD,
      database: this.envConfig.DB_NAME,
      synchronize: true,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    };
  }

  public getValue(key: string): string {
		return this.envConfig[key] ? this.envConfig[key] : null;
	}
}

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

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.envConfig.MYSQL_HOST,
            port: this.envConfig.MYSQL_PORT,
            username: this.envConfig.MYSQL_USER,
            password: this.envConfig.MYSQL_PASS,
            database: this.envConfig.MYSQL_DB,
            synchronize: true,
            entities: [__dirname + '/../**/*.entity{.ts,.js}']
        }
    }


}

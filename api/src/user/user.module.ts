import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetworkModule } from 'src/network/network.module';
import { NetworkService } from 'src/network/network.service';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserNetworkService } from './user.network.service';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

const entities = [User];
const repositories = [UserRepository];
@Module({
  imports: [
    NetworkModule,
    TypeOrmModule.forFeature([...entities, ...repositories]),
  ],
  controllers: [UserController],
  providers: [UserService, UserNetworkService, NetworkService],
})
export class UserModule {}

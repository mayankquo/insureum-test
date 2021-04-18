import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetworkService } from 'src/network/network.service';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

const entities = [User]
const repositories = [UserRepository]
@Module({
  imports:[TypeOrmModule.forFeature([...entities, ...repositories])],
  controllers: [UserController],
  providers: [UserService, NetworkService]
})
export class UserModule {}

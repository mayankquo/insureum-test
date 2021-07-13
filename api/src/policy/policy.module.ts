import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetworkModule } from 'src/network/network.module';
import { NetworkService } from 'src/network/network.service';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Policy } from './entities/policy.entity';
import { PolicyController } from './policy.controller';
import { PolicyRepository } from './policy.repository';
import { PolicyService } from './policy.service';
import { PolicyNetworkService } from './policy.network.service';

const entities = [Policy, User];
const repositories = [PolicyRepository, UserRepository];

@Module({
  imports: [
    TypeOrmModule.forFeature([...entities, ...repositories]),
    NetworkModule,
  ],
  controllers: [PolicyController],
  providers: [PolicyService, PolicyNetworkService, NetworkService],
})
export class PolicyModule {}

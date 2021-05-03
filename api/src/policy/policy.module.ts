import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Policy } from './entities/policy.entity';
import { PolicyController } from './policy.controller';
import { PolicyRepository } from './policy.repository';
import { PolicyService } from './policy.service';

const entities = [Policy, User];
const repositories = [PolicyRepository, UserRepository];

@Module({
  imports: [TypeOrmModule.forFeature([...entities, ...repositories])],
  controllers: [PolicyController],
  providers: [PolicyService],
})
export class PolicyModule {}

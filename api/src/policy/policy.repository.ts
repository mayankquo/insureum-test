import { BaseRepository } from 'src/core/helpers/base.repository';
import { EntityRepository } from 'typeorm';
import { GeneratePolicyDto } from './dtos/genaratePolicy.dto';
import { Policy } from './entities/policy.entity';

@EntityRepository(Policy)
export class PolicyRepository extends BaseRepository<Policy> {
  public createPolicy(
    generatePolicyDto: GeneratePolicyDto,
  ): Promise<Policy | null> {
    return this.save(generatePolicyDto);
  }

  public getAllPolicies(userId): Promise<Policy[]> {
    return this.repository
      .createQueryBuilder('Policy')
      .innerJoinAndSelect('Policy.issuedBy', 'User')
      .where('Policy.issuerId = :userId', { userId })
      .orderBy('Policy.createdAt', 'DESC')
      .getMany();
  }
}

import { BaseRepository } from 'src/core/helpers/base.repository';
import { EntityRepository } from 'typeorm';
import { IssuePolicyDto } from './dtos/issuePolicy.dto';
import { Policy } from './entities/policy.entity';

@EntityRepository(Policy)
export class PolicyRepository extends BaseRepository<Policy> {
  public async issuePolicy(
    issuePolicyDto: IssuePolicyDto,
  ): Promise<Policy | null> {
    return this.save(issuePolicyDto);
  }

  public async getAllPoliciesByIssuerId(issuerId): Promise<Policy[]> {
    return this.repository
      .createQueryBuilder('Policy')
      .innerJoinAndSelect('Policy.issuedBy', 'User')
      .where('Policy.issuerId = :issuerId', { issuerId })
      .getMany();
  }

  public async getPolicyDetailsByPolicyId(policyId: string) {
    return this.repository
      .createQueryBuilder('Policy')
      .innerJoinAndSelect('Policy.issuedBy', 'User')
      .where('Policy.id = :id', { id: policyId })
      .getOne();
  }
}

import { BaseRepository } from 'src/core/helpers/base.repository';
import { EntityRepository } from 'typeorm';
import { GeneratePolicyDto } from './dtos/genaratePolicy.dto';
import { Policy } from './entities/policy.entity';

@EntityRepository(Policy)
export class PolicyRepository extends BaseRepository<Policy> {
  public async createPolicy(
    generatePolicyDto: GeneratePolicyDto,
  ): Promise<Policy | null> {
    return this.save(generatePolicyDto);
  }

  public async getAllPolicies(userId): Promise<Policy[]> {
    console.log(userId)
    return await this.repository
      .createQueryBuilder('Policy')
      .innerJoinAndSelect('Policy.issuedBy', 'User')
      .where('Policy.issuerId = :userId', { userId })
      .orderBy('Policy.createdAt', 'DESC')
      .getMany();
  }
}

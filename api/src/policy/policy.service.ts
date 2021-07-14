import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { ResponseDTO } from 'src/core/dtos';
import { Orgs } from 'src/core/enums';
import { InsuranceType } from 'src/core/enums/insuranceType';
import { UserRole } from 'src/core/enums/userRole';
import { NetworkService } from 'src/network/network.service';
import { UserRepository } from 'src/user/user.repository';
import { IssuePolicyDto } from './dtos/issuePolicy.dto';
import { IssuePolicyTxnDto } from './dtos/issuePolicy.txn.dto';
import { PolicyNetworkService } from './policy.network.service';
import { PolicyRepository } from './policy.repository';

const LOGGER_PREFIX = 'PolicyService';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(PolicyRepository)
    private readonly policyRepository: PolicyRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(PolicyNetworkService)
    private readonly policyNetworkService: PolicyNetworkService,
  ) {}

  /**
   * Create new insurance policy
   * @param generatePolicyDto
   */
  public async issuePolicy(issuePolicyDto: IssuePolicyDto) {
    const user = await this.userRepository.get({
      where: {
        id: issuePolicyDto.issuerId,
        role: UserRole.Insurer,
      },
    });

    if (!user) {
      throw new HttpException('User does not exists', HttpStatus.BAD_REQUEST);
    }

    try {
      const newPolicy = await this.policyRepository.issuePolicy(issuePolicyDto);

      const issuePolicyTxnDto = plainToClass(IssuePolicyTxnDto, {
        id: newPolicy.id,
        issuedBy: {
          id: user.id,
          email: user.email,
        },
        type: issuePolicyDto.type,
        premium: issuePolicyDto.premium,
        sumCovered: issuePolicyDto.sumCovered,
        issuedAt: Date,
      });
      await this.policyNetworkService.issuePolicyTxn(
        user.email,
        Orgs.Insurer,
        issuePolicyTxnDto,
      );

      return plainToClass(ResponseDTO, {
        success: true,
        data: newPolicy,
      });
    } catch (error) {
      console.log(LOGGER_PREFIX, 'getAllPolicies', error);
      throw new HttpException(
        `Something went wrong. Please try again later.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAllPoliciesByIssuerId(issuerId: string) {
    try {
      const user = this.userRepository.get({
        where: {
          id: issuerId,
          role: UserRole.Insurer,
        },
      });

      if (!user) {
        throw new HttpException('User does not exists', HttpStatus.BAD_REQUEST);
      }

      const policies = this.policyRepository.getAllPoliciesByIssuerId(issuerId);
      return plainToClass(ResponseDTO, {
        success: true,
        data: policies,
      });
    } catch (error) {
      console.log(LOGGER_PREFIX, 'getAllPolicies', error);
      throw new HttpException(
        `Something went wrong. Please try again later.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

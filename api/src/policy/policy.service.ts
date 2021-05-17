import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { ResponseDTO } from 'src/core/dtos';
import { UserRole } from 'src/core/enums/userRole';
import { UserRepository } from 'src/user/user.repository';
import { GeneratePolicyDto } from './dtos/genaratePolicy.dto';
import { PolicyRepository } from './policy.repository';

const LOGGER_PREFIX = 'PolicyService';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(PolicyRepository)
    private readonly policyRepository: PolicyRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * Create new insurance policy
   * @param generatePolicyDto
   */
  public async generatePolicy(generatePolicyDto: GeneratePolicyDto) {
    try {
      const user = await this.userRepository.get({where:{
        id: generatePolicyDto.issuerId,
        role: UserRole.Insurer
      }});

      if (!!user) {
        const newPolicy = await this.policyRepository.createPolicy(
          generatePolicyDto,
        );
        return plainToClass(ResponseDTO, {
          success: true,
          data: newPolicy,
        });
      } else {
        return plainToClass(ResponseDTO, {
          success: false,
          message: 'User not authorized',
        });
      }
    } catch (error) {
      console.log(LOGGER_PREFIX, 'generatePolicy', error);
      throw new HttpException(
        `Something went wrong. Please try again later.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAllPolicies(userId: string) {
    try {
      const user = this.userRepository.get({
        where : {
          id: userId,
          role: UserRole.Insurer
        }
      });

      if (!!user) {
        const policies = this.policyRepository.getAllPolicies(userId);
        return plainToClass(ResponseDTO, {
          success: true,
          data: policies,
        });
      } else {
        return plainToClass(ResponseDTO, {
          success: false,
          message: 'User not authorized',
        });
      }
    } catch (error) {
      console.log(LOGGER_PREFIX, 'getAllPolicies', error);
      throw new HttpException(
        `Something went wrong. Please try again later.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

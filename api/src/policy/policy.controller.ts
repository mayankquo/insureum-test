import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GeneratePolicyDto } from './dtos/genaratePolicy.dto';
import { PolicyService } from './policy.service';

@ApiTags('Policy')
@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Post('generate')
  public async issuePolicy(
    @Body() generatePolicyDto: GeneratePolicyDto,
  ) {
    return await this.policyService.generatePolicy(generatePolicyDto);
  }

  @Get('all')
  public async getAllPolicies(
    @Query('userId') userId: string
  ){
    return await this.policyService.getAllPolicies(userId);
  }
}

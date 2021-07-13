import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IssuePolicyDto } from './dtos/issuePolicy.dto';
import { PolicyService } from './policy.service';

@ApiTags('Policy')
@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Post('issue')
  public async issuePolicy(
    @Body() issuePolicyDto: IssuePolicyDto,
  ) {
    return this.policyService.issuePolicy(issuePolicyDto);
  }

  @Get('all')
  public async getAllPoliciesByIssuerId(
    @Query('issuerId') issuerId: string
  ){
    return this.policyService.getAllPoliciesByIssuerId(issuerId);
  }

}

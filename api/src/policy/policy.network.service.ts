import { Inject, Injectable } from '@nestjs/common';
import { Orgs } from 'src/core/enums';
import { ChannelName } from 'src/core/enums/channelName';
import { NetworkService } from 'src/network/network.service';
import { IssuePolicyTxnDto } from './dtos/issuePolicy.txn.dto';
import { PolicyTxnFunction } from './enums/transactionName';

const LOGGER_PREFIX = 'PolicyTxnService';

@Injectable()
export class PolicyNetworkService {
  constructor(
    @Inject(NetworkService)
    private readonly networkService: NetworkService,
  ) {}

  public async issuePolicyTxn(
    email: string,
    org: Orgs,
    txnDto: IssuePolicyTxnDto,
    channelName = ChannelName.Common,
    chaincodeId = 'Insurance Contract',
    transactionName = PolicyTxnFunction.Issue,
  ) {
    try {
      const peerGatewayInstance = await this.networkService.getPeerGatewayInstance(
        email,
        org,
      );

      // Obtain the smart contract with which our application wants to interact
      const network = await peerGatewayInstance.getNetwork(channelName);
      const contract = network.getContract(chaincodeId);

      // Submit transactions for the smart contract
      const args = [JSON.stringify(txnDto)];
      const submitResult = await contract.submitTransaction(
        transactionName,
        ...args,
      );

      // Evaluate queries for the smart contract
      const evalResult = await contract.evaluateTransaction(
        transactionName,
        ...args,
      );
      console.log(submitResult, evalResult)
    } catch (error) {
      console.log(LOGGER_PREFIX, 'issuePolicyTxn', error);
      throw new Error(error);
    }
  }
}

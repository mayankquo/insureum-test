import { Inject, Injectable } from '@nestjs/common';
import { NetworkService } from 'src/network/network.service';
import { UserDto } from './dtos';

const LOGGER_PREFIX = 'PolicyTxnService';

@Injectable()
export class UserNetworkService {
  constructor(
    @Inject(NetworkService)
    private readonly networkService: NetworkService,
  ) {}

  public async registerInsurer(newUser: UserDto) {
    try {
      await this.networkService.registerAndEnrollUser(newUser);
    } catch (error) {
      console.log(LOGGER_PREFIX, 'registerInsurer', error);
      throw new Error(error);
    }
  }
}

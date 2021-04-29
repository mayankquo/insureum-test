import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NetworkService } from 'src/network/network.service';
import { UserDto } from './dtos';
import { UserRepository } from './user.repository';
import { plainToClass } from 'class-transformer';
import { ResponseDTO } from 'src/core/dtos';

const LOGGER_PREFIX = 'UserService';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly networkService: NetworkService,
  ) {}

  public async registerUser(newUser: UserDto) {
    try {
      await this.networkService.registerAndEnrollUser(newUser);
      const wallet = await this.networkService.buildWallet(newUser.org);
      const isUserEnrolled = !!(await wallet.get(newUser.email));
      if (isUserEnrolled) {
        await this.userRepository.save(newUser);
        return plainToClass(ResponseDTO, {
          success: true,
        });
      } else {
        return plainToClass(ResponseDTO, {
          success: false,
        });
      }
    } catch (error) {
      console.log(LOGGER_PREFIX, 'registerUser', error);
      throw new HttpException(
        `Something went wrong. Please try again later.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dtos';
import { UserRepository } from './user.repository';
import { plainToClass } from 'class-transformer';
import { ResponseDTO } from 'src/core/dtos';
import { UserRole } from 'src/core/enums/userRole';
import { Orgs } from 'src/core/enums';
import { UserNetworkService } from './user.network.service';

const LOGGER_PREFIX = 'UserService';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(UserNetworkService)
    private readonly userNetworkService: UserNetworkService,
  ) {}

  /**
   * Register new user
   * @param newUser
   * @returns
   */
  public async register(newUser: UserDto): Promise<ResponseDTO> {
    try {
      if (newUser.role === UserRole.Insurer) {
        newUser.org = Orgs.Insurer;
        await this.userNetworkService.registerInsurer(newUser);
      }

      await this.userRepository.save(newUser);
      return plainToClass(ResponseDTO, {
        success: true,
      });
    } catch (error) {
      console.log(LOGGER_PREFIX, 'registerUser', error);
      throw new HttpException(
        `Something went wrong. Please try again later.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getUserByEmail(email: string) {
    return this.userRepository.get({ where: { email } });
  }

  public async getUserByUserId(userId: string) {
    return this.userRepository.getUserById(userId);
  }
}

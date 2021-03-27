import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dtos';
import { UserRepository } from './user.repository';

const LOGGER_PREFIX = 'UserService'
@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
		private readonly userRepository: UserRepository
    ){}

    public async registerUser(newUser: UserDto){
        try{
            return await this.userRepository.save(newUser);
        }catch(error){
            console.log(LOGGER_PREFIX, 'registerUser', error)
			throw new HttpException(
				`Something went wrong. Please try again later.`,
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
        }
        
    }
}

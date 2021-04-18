import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './dtos';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    public async registerUser(@Body() newUser: UserDto){
        return await this.userService.registerUser(newUser);
    }
}

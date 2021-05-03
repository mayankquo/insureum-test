import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UserDto } from './dtos';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    @ApiBody({ type: UserDto, required: true})
    public async registerUser(@Body() newUser: UserDto){
        return await this.userService.register(newUser);
    }
}

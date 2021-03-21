import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos';

@Controller('user')
export class UserController {

    @Post('create')
    public createUser(@Body() createUser: CreateUserDto){
        
    }
}

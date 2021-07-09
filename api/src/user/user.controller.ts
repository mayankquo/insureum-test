import { Body, Controller, Post,} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dtos';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiBody({ type: UserDto, required: true })
  public async registerUser(@Body() newUser: UserDto) {
    return this.userService.register(newUser);
  }
}

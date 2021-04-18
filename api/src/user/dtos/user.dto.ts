import { IsNotEmpty, IsEmail } from "class-validator";
import { Orgs } from '../../core/enums';

export class UserDto{
    
	@IsNotEmpty()
	readonly name: string;

	@IsNotEmpty()
	readonly password: string;

	@IsEmail()
	@IsNotEmpty()
	readonly email: string;

	@IsNotEmpty()
	readonly org: Orgs;

}
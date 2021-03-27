import { IsNotEmpty, IsEmail } from "class-validator";
import { Orgs } from "enums";

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
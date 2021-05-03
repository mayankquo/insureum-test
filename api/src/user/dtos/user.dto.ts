import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";
import { UserRole } from "src/core/enums/userRole";
import { Orgs } from '../../core/enums';

export class UserDto{
    
	@IsNotEmpty()
	@ApiProperty()
	readonly name: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly password: string;

	@IsEmail()
	@IsNotEmpty()
	@ApiProperty()
	readonly email: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly role: UserRole;

	@ApiProperty()
	readonly gstin: string;

	org: Orgs;

}
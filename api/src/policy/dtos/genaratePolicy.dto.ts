import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { InsuranceType } from "src/core/enums/insuranceType";

export class GeneratePolicyDto{

    @ApiProperty()
	@IsNotEmpty()
	readonly issuerId: string;

    @ApiProperty()
	@IsNotEmpty()
	readonly type: InsuranceType;

	@ApiProperty()
	@IsNotEmpty()
	readonly premium: string;

    @ApiProperty()
	@IsNotEmpty()
    readonly sumCovered: string;

    @ApiProperty()
    readonly issuedAt: Date;
}
import { InsuranceType } from "../enums/insuranceType";
import { Insurer } from "../models/insurer.model";
import { User } from "../models/user.model";

export class CreateInsuranceDto {
  public id: string;
  public issuedBy: Insurer;
  public type: InsuranceType;
  public sumCovered: string;
  public issuedAt: Date;
}

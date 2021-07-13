import { InsuranceType } from "../enums/insuranceType";
import { Insurer } from "../models/insurer.model";

export class IssuePolicyDto {
  public id: string;
  public issuedBy: Insurer;
  public type: InsuranceType;
  public premium: string;
  public sumCovered: string;
  public issuedAt: Date;
}

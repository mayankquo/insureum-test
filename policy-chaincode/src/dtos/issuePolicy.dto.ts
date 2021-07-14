import { InsuranceType } from "../enums/insuranceType";

export class IssuePolicyDto {
  public id: string;
  public issuedBy: string;
  public type: InsuranceType;
  public premium: string;
  public sumCovered: string;
  public issuedAt: Date;
}

import { InsuranceType } from 'src/core/enums/insuranceType';
import { Insurer } from './insurer.txn.dto';

export class IssuePolicyTxnDto {
  public id: string;
  public issuedBy: Insurer;
  public type: InsuranceType;
  public sumCovered: string;
  public issuedAt: Date;
}

import { Object, Property } from "fabric-contract-api";
import { InsuranceType } from "./enums/insuranceType";
import { Insurer } from "./models/insurer.model";
import { User } from "./models/user.model";

@Object()
export class Insurance {

  @Property('id', 'string')
  public id: string;

  @Property()
  public issuedBy: Insurer;

  @Property()
  public type: InsuranceType;

  @Property()
  public premium: string;

  @Property()
  public buyer: User; 

  @Property()
  public nominee: string;

  @Property()
  public sumCovered: string; 

  @Property()
  public issuedAt: Date;

  @Property()
  public boughtAt: Date;

  @Property()
  public claimedAt: Date;

  @Property()
  public updatedAt: Date;

  @Property()
  public renewedAt : Date;

  @Property()
  public expiredAt: Date;

  constructor(){}


}

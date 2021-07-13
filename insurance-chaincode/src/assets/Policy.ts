import { Object, Property } from "fabric-contract-api";

@Object()
export class Policy {
  @Property("id")
  public id: string;

  @Property("issuedBy")
  public issuedBy: string;

  @Property("type")
  public type: string;

  @Property("premium")
  public premium: string;

  @Property("buyer")
  public buyer: string;

  @Property("nominee")
  public nominee: string;

  @Property("sumCovered")
  public sumCovered: string;

  @Property("issuedAt")
  public issuedAt: string;

  @Property("boughtAt")
  public boughtAt: string;

  @Property("claimedAt")
  public claimedAt: string;

  @Property("updatedAt")
  public updatedAt: string;

  @Property("renewedAt")
  public renewedAt: string;

  @Property("expiredAt")
  public expiredAt: string;
}

import { Info, Object, Property } from "fabric-contract-api";
import { InsuranceType } from "./enums/insuranceType";
import { Insurer } from "./models/insurer.model";
import { User } from "./models/user.model";

@Object()
export class Insurance {
  private _id: string;
  private _issuedBy: Insurer;
  private _type: InsuranceType;
  private _premium: string;
  private _buyer: User | null;
  private _nominee: string | null;
  private _sumCovered: string;
  private _issuedAt: Date;
  private _boughtAt: Date | null;
  private _claimedAt: Date | null;
  private _updatedAt: Date;
  private _renewedAt: Date | null;
  private _expiredAt: Date;

  constructor(data: any) {
    this._id = data ? data.id : null;
    this._issuedBy = data ? data.issuedBy : null;
    this._type = data ? data.type : null;
    this._premium = data ? data.premium : null;
    this._buyer = data ? data.buyer : null;
    this._nominee = data ? data.nominee : null;
    this._sumCovered = data ? data.sumCovered : null;
    this._issuedAt = data ? data.issuedAt : null;
    this._boughtAt = data ? data.boughtAt : null;
    this._claimedAt = data ? data.claimedAt : null;
    this._updatedAt = data ? data.updatedAt : null;
    this._renewedAt = data ? data.renewedAt : null;
    this._expiredAt = data ? data.expiredAt : null;
  }

  @Property("id")
  get id() {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  @Property("issuedBy")
  get issuedBy() {
    return this._issuedBy;
  }

  set issuedBy(issuedBy: Insurer) {
    this._issuedBy = issuedBy;
  }

  @Property("type")
  get type() {
    return this._type;
  }

  set type(type: InsuranceType) {
    this._type = type;
  }

  @Property("premium")
  get premium() {
    return this._premium;
  }

  set premium(premium: string) {
    this._premium = premium;
  }

  @Property("buyer")
  get buyer() {
    return this._buyer;
  }

  set buyer(buyer: User | null) {
    this._buyer = buyer;
  }

  @Property("nominee")
  get nominee() {
    return this._nominee;
  }

  set nominee(nominee: string | null) {
    this._nominee = nominee;
  }

  @Property("sumCovered")
  get sumCovered() {
    return this._sumCovered;
  }

  set sumCovered(sumCovered: string) {
    this._sumCovered = sumCovered;
  }

  @Property("issuedAt")
  get issuedAt() {
    return this._issuedAt;
  }

  set issuedAt(issuedAt: Date) {
    this._issuedAt = issuedAt;
  }

  @Property("boughtAt")
  get boughtAt() {
    return this._boughtAt;
  }

  set boughtAt(boughtAt: Date | null) {
    this._boughtAt = boughtAt;
  }

  @Property("claimedAt")
  get claimedAt() {
    return this._claimedAt;
  }

  set claimedAt(claimedAt: Date | null) {
    this._claimedAt = claimedAt;
  }

  @Property("updatedAt")
  get updatedAt() {
    return this._updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
  }

  @Property("renewedAt")
  get renewedAt() {
    return this._renewedAt;
  }

  set renewedAt(renewedAt: Date | null) {
    this._renewedAt = renewedAt;
  }

  @Property("expiredAt")
  get expiredAt() {
    return this._expiredAt;
  }

  set expiredAt(expiredAt: Date) {
    this._expiredAt = expiredAt;
  }
}

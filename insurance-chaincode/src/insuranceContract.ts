import { plainToClass } from "class-transformer";
import { Context, Contract, Info, Transaction } from "fabric-contract-api";
import { ReadInsuranceDto } from "./dtos/readInsurance.dto";
import { Insurance } from "./Insurance";

@Info({
  title: "AssetTransfer",
  description: "Smart contract for issuing, buying and claiming insurance",
})
export class InsuranceContract extends Contract {

  @Transaction()
  public init(ctx: Context){
    console.log(`Invoked successfully. TxId : ${ctx.stub.getTxID()}`)
  }

  async beforeTransaction(ctx: Context) {
    ctx.logger.getLogger(ctx.clientIdentity.getMSPID());
    console.log(ctx.clientIdentity.getMSPID());
  }

  async afterTransaction(ctx: Context, result: any) {
    ctx.logger.getLogger(result);
    console.log(result);
  }

  async unknownTransaction(ctx: Context) {
    ctx.logger.getLogger(
      `You've asked to invoke a function that does not exist: ${ctx.stub.getFunctionAndParameters()}`
    );
    console.log(ctx.stub.getFunctionAndParameters());
    throw new Error(
      `You've asked to invoke a function that does not exist: ${ctx.stub.getFunctionAndParameters()}`
    );
  }

  @Transaction()
  public async issue(ctx: Context, params: Insurance) {
    await ctx.stub.putState(
      `${params.issuedBy.id}::${params.id}::${params.buyer.id}`,
      Buffer.from(JSON.stringify(params))
    );
  }

  @Transaction()
  public async read(
    ctx: Context,
    params: ReadInsuranceDto
  ): Promise<Insurance> {
    const result = await ctx.stub.getState(
      `${params.issuedById}::${params.insuranceid}::${params.buyerId}`
    );
    if (!result || result.length === 0) {
      throw new Error(
        `The asset ${params.issuedById}::${params.insuranceid}::${params.buyerId} does not exist`
      );
    }
    return plainToClass(Insurance, result?.toString());
  }

  @Transaction()
  public async buy(ctx: Context) {}

  @Transaction()
  public async claim(ctx: Context) {}
}

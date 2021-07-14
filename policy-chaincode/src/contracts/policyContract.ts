import { plainToClass } from "class-transformer";
import { Context, Contract, Info, Transaction } from "fabric-contract-api";
import { IssuePolicyDto } from "../dtos/issuePolicy.dto";
import { Policy } from "../assets/Policy";

@Info({
  title: "Policy Contract",
  version: "1.0.1",
})
export class PolicyContract extends Contract {
  @Transaction()
  public init(ctx: Context) {
    console.log(`Invoked successfully. TxId : ${ctx.stub.getTxID()}`);
  }

  async beforeTransaction(ctx: Context) {
    console.log(ctx.clientIdentity.getMSPID());
  }

  async afterTransaction(ctx: Context, result: any) {
    console.log(result);
  }

  async unknownTransaction(ctx: Context) {
    console.log(
      `You've asked to invoke a function that does not exist: ${ctx.stub.getFunctionAndParameters()}`
    );
    throw new Error(
      `You've asked to invoke a function that does not exist: ${ctx.stub.getFunctionAndParameters()}`
    );
  }

  @Transaction()
  public async issue(ctx: Context, params: IssuePolicyDto) {
    const value = plainToClass(Policy, params);
    await ctx.stub.putState(
      `${params.issuedBy}::${params.id}`,
      Buffer.from(JSON.stringify(value))
    );
  }
}
import {Context, Contract, Info, Transaction} from 'fabric-contract-api';

@Info({title: 'AssetTransfer', description: 'Smart contract for issuing, buying and claiming insurance'})
export class InsuranceContract extends Contract{

    @Transaction()
    public async issue(ctx: Context){

    }

}
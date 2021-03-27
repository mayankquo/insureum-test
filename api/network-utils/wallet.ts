import path from 'node:path';
import fs from 'node:fs'
import { Wallets } from 'fabric-network'
import { Orgs } from 'enums';

export class Wallet {

    public async buildWallet(org: Orgs) {

        let wallet;
        const walletPath = path.join(__dirname, '..', '..', `wallet/${org}`);
        if (walletPath) {
            wallet = await Wallets.newFileSystemWallet(walletPath);
            console.log(`Built a file system wallet at ${walletPath}`);
        } else {
            wallet = await Wallets.newInMemoryWallet();
            console.log('Built an in memory wallet');
        }

        return wallet;
    }

    public buildCCPOrg(org: Orgs) {
        const ccpPath = path.resolve(__dirname, '..', '..', 'organizations', 'peerOrganizations', `${org}.insureum.com`, `connection-${org}.json`);
        const fileExists = fs.existsSync(ccpPath);
        if (!fileExists) {
            throw new Error(`no such file or directory: ${ccpPath}`);
        }
        const contents = fs.readFileSync(ccpPath, 'utf8');

        // build a JSON object from the file contents
        const ccp = JSON.parse(contents);

        console.log(`Loaded the network configuration located at ${ccpPath}`);
        return ccp;
    }


}
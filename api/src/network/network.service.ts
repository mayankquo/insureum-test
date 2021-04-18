import { Injectable } from '@nestjs/common';
import FabricCAServices from 'fabric-ca-client';
import { Wallets } from 'fabric-network';
import * as path from 'path';
import * as fs from 'fs'
import { UserDto } from 'src/user/dtos';
import { Orgs } from './../core/enums';

const LOGGER_PREFIX = 'NetworkService'
const admin = {
    email: 'admin',
    password: 'adminpw'
}

@Injectable()
export class NetworkService {

    public async buildWallet(org: Orgs) {

        try {
            let wallet;
            const walletPath = path.resolve(__dirname, '..', '..', 'wallet', `${org}`)

            if (fs.existsSync(walletPath)) {
                wallet = await Wallets.newFileSystemWallet(walletPath);
                console.log(`Built a file system wallet at ${walletPath}`);
            }

            return wallet;
        } catch (error) {
            console.log(`${LOGGER_PREFIX}::buildWallet()::`, error)
        }

    }

    public buildCCPOrg(org: Orgs) {
        const ccpPath = path.resolve(__dirname, '..', '..', '..', 'organizations', 'peerOrganizations', `${org}.insureum.com`, `connection-${org}.json`);
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

    private buildCAClient(ccp, caHostName) {
        const caInfo = ccp.certificateAuthorities[caHostName];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const caClient = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        console.log(`Built a CA Client named ${caInfo.caName}`);
        return caClient;
    }

    private async enrollAdmin(org: Orgs, ccp, caHostName) {

        try {
            const wallet = await this.buildWallet(org);
            const adminIdentity = await wallet.get(admin.email)

            if (adminIdentity) {
                console.log('An identity for the admin user for org %s already exists in the wallet', org);
                return;
            }

            // Enroll the admin user, and import the new identity into the wallet.
            const caClient = this.buildCAClient(ccp, caHostName)
            const enrollment = await caClient.enroll({
                enrollmentID: admin.email,
                enrollmentSecret: admin.password
            });
            const x509Identity = {
                credentials: {
                    certificate: enrollment.certificate,
                    privateKey: enrollment.key.toBytes(),
                },
                mspId: `${org}MSP`,
                type: 'X.509',
            };
            await wallet.put(admin.email, x509Identity);
            console.log('Successfully enrolled admin user and imported it into the wallet');
        } catch (error) {
            console.log(`${LOGGER_PREFIX}::enrollAdmin()::`, error)
        }

    }

    public getCcpPathAndCaHostName(org: Orgs) {
        return {
            ccpPath: `../../../organizations/peerOrganizations/insurer.insureum.com/connection-${org}.json`,
            caHostName: `ca.${org}.insureum.com`
        }
    }

    public async registerAndEnrollUser(user: UserDto) {

        try {
            const { ccpPath, caHostName } = this.getCcpPathAndCaHostName(user.org)
            const ccp = this.buildCCPOrg(user.org);
            const wallet = await this.buildWallet(user.org);
            const userIdentity = await wallet.get(user.email);
            if (userIdentity) {
                console.log(`An identity for the user ${user.email} already exists in the wallet`);
                return;
            }

            let adminIdentity = await wallet.get(admin.email);
            if (!adminIdentity) {
                console.log('An identity for the admin user for %s does not exist in the wallet', user.org);
                console.log('Enroll the admin user before retrying');
                await this.enrollAdmin(user.org, ccp, caHostName)
                adminIdentity = await wallet.get(admin.email);
            }

            const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
            const adminUser = await provider.getUserContext(adminIdentity, admin.email);

            const caClient = this.buildCAClient(ccp, caHostName)
            const secret = await caClient.register({
                affiliation: `${user.org}.department1`,
                enrollmentID: user.email,
                role: 'client'
            }, adminUser);
            const enrollment = await caClient.enroll({
                enrollmentID: user.email,
                enrollmentSecret: secret
            });
            const x509Identity = {
                credentials: {
                    certificate: enrollment.certificate,
                    privateKey: enrollment.key.toBytes(),
                },
                mspId: `${user.org}MSP`,
                type: 'X.509',
            };
            await wallet.put(user.email, x509Identity);
            console.log(`Successfully registered and enrolled user ${user.email} and imported it into the wallet`);
        } catch (error) {
            console.log(`${LOGGER_PREFIX}::registerAndEnrollUser()::`, error)
        }

    }
}

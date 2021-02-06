import { storeSkillWallet, getSkillWalletByID, initialize } from "./threaddb.config";
import { ThreeIdConnect, EthereumAuthProvider } from '3id-connect'
import Ceramic from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx'

/**
 * SkillWallet class providing functionality for connecting to 
 * a user skill wallet with Metamask. 
 * Before using it, it should be initialized with a certain user address
 */
export default class SkillWallet {

    static isInitialized = false;
    static async init(address) {
        const threeIdConnect = new ThreeIdConnect()

        this.ceramic = new Ceramic('https://ceramic-clay.3boxlabs.com')
        this.idx = new IDX({ ceramic: this.ceramic })

        const authProvider = new EthereumAuthProvider(window.ethereum, address)
        await threeIdConnect.connect(authProvider)
        const didProvider = await threeIdConnect.getDidProvider()
        await this.ceramic.setDIDProvider(didProvider)

        SkillWallet.isInitialized = true;

    }

    static async store(obj) {
        if (!SkillWallet.isInitialized) {
            throw Error('Skill Wallet not initialized.');
        }
        const ids = await storeSkillWallet(obj)
        const skillWallet = {
            skillWalletID: ids[0]
        }
        await this.idx.set('kjzl6cwe1jw149c99wfm211w3nu6btfa4dtitrztha06xt3yshdd695c0vm4tgl', skillWallet);
        return ids[0];
    }

    static async get() {
        if (!SkillWallet.isInitialized) {
            throw Error('Skill Wallet not initialized.');
        }

        console.log('getting idx doc')
        const idxRes = await this.idx.get('kjzl6cwe1jw149c99wfm211w3nu6btfa4dtitrztha06xt3yshdd695c0vm4tgl');
        console.log(idxRes);
        const wallet = await getSkillWalletByID(idxRes.skillWalletID)
        return wallet;
    }


    static async getSkillWalletID() {
        if (!SkillWallet.isInitialized) {
            throw Error('Skill Wallet not initialized.');
        }

        console.log('getting idx doc')
        const idxRes = await this.idx.get('kjzl6cwe1jw149c99wfm211w3nu6btfa4dtitrztha06xt3yshdd695c0vm4tgl');
        return idxRes.skillWalletID;
    }


}
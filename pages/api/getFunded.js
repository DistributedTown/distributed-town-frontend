import { ethers } from 'ethers';

export default async function handler(req, res) {
  try {
    // TODO: move in env
    const INFURA_PROVIDER_URL =
      'https://ropsten.infura.io/v3/6a96a40694e24de3b6313b71ca71786b';
    const WALLET_MNEMONIC =
      'welcome parade tired spin security depend spy move three clerk loyal lunar';

    const mnemonic = WALLET_MNEMONIC;
    const walletMnemonic = ethers.Wallet.fromMnemonic(mnemonic);

    const { publicAddress } = JSON.parse(req.body);

    const tx = {
      to: publicAddress,
      value: ethers.utils.parseEther('0.1'),
    };

    // Signing a transaction
    await walletMnemonic.signTransaction(tx);
    // The connect method returns a new instance of the
    // Wallet connected to a provider
    const provider = new ethers.providers.JsonRpcProvider(INFURA_PROVIDER_URL);
    const wallet = walletMnemonic.connect(provider);

    // Sending ether
    await wallet.sendTransaction(tx);

    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(400);
    res.send(err);
  }
}

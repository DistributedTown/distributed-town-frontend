import { ethers } from "ethers";

export default async function handler(req, res) {
  try {
    const mnemonic = process.env.WALLET_MNEMONIC;
    const walletMnemonic = ethers.Wallet.fromMnemonic(mnemonic);

    let tx = {
      to: req.body.publicAddress,
      value: ethers.utils.parseEther("0.1"),
    };

    // Signing a transaction
    await walletMnemonic.signTransaction(tx);
    // The connect method returns a new instance of the
    // Wallet connected to a provider
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.INFURA_PROVIDER_URL
    );
    let wallet = walletMnemonic.connect(provider);

    // Sending ether
    await wallet.sendTransaction(tx);

    res.status(200).end();
  } catch (err) {
    console.error(err);
  }
}

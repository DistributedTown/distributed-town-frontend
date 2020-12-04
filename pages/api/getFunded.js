import { ethers } from "ethers";

export default async function handler(req, res) {
  try {
    //TODO move in env
    const PROVIDER_URL =
      process.env.BLOCKCHAIN === "ETH"
        ? "https://ropsten.infura.io/v3/6a96a40694e24de3b6313b71ca71786b"
        : `https://rpc-mainnet.maticvigil.com/v1/${process.env.MATICVIGIL_PROJECT_ID}`;
    const WALLET_MNEMONIC =
      "welcome parade tired spin security depend spy move three clerk loyal lunar";

    const mnemonic = WALLET_MNEMONIC;
    const walletMnemonic = ethers.Wallet.fromMnemonic(mnemonic);

    let { publicAddress } = JSON.parse(req.body);

    let tx = {
      to: publicAddress,
      value: ethers.utils.parseEther("0.1"),
    };

    // Signing a transaction
    await walletMnemonic.signTransaction(tx);
    // The connect method returns a new instance of the
    // Wallet connected to a provider
    const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
    let wallet = walletMnemonic.connect(provider);

    // Sending ether
    await wallet.sendTransaction(tx);

    res.status(200).end();
  } catch (err) {
    console.error(err);
  }
}

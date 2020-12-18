import { ethers } from 'ethers';

export default async function handler(req, res) {
  try {
    // TODO: move in env
    // `https://rpc-mainnet.maticvigil.com/v1/${process.env.MATICVIGIL_PROJECT_ID}`;
    const WALLET_MNEMONIC =
      'welcome parade tired spin security depend spy move three clerk loyal lunar';

    const mnemonic = WALLET_MNEMONIC;
    let wallet = ethers.Wallet.fromMnemonic(mnemonic);
    const { publicAddress } = JSON.parse(req.body);

    const txPayload = {
      to: publicAddress,
      // TODO: This should be different depending on the network
      value: ethers.utils.parseEther('0.1'),
    };

    // Signing a transaction
    await wallet.signTransaction(txPayload);

    const rpcProviderArgs = process.env.NEXT_PUBLIC_RPC_URL
      ? [
          process.env.NEXT_PUBLIC_RPC_URL,
          { chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10) },
        ]
      : // Defaults to ropsten
        ['https://ropsten.infura.io/v3/6a96a40694e24de3b6313b71ca71786b'];
    const provider = new ethers.providers.JsonRpcProvider(...rpcProviderArgs);
    // The connect method returns a new instance of the
    // Wallet connected to a provider
    wallet = wallet.connect(provider);

    // Sending ether
    const tx = await wallet.sendTransaction(txPayload);

    console.log('Transaction', tx);
    console.log('Waiting for transaction to finish', await tx.wait());

    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(400);
    res.send(err);
  }
}

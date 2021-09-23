
export const changeNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }],
      })
      console.log('switched');
    } catch (switchError) {
      console.log(switchError);
      console.log('it errored!')
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x13881', // A 0x-prefixed hexadecimal string
              chainName: 'Mumbai',
              nativeCurrency: {
                name: 'Matic',
                symbol: 'MATIC',
                decimals: 18
              },
              rpcUrls: ['https://matic-mumbai.chainstacklabs.com', 'https://rpc-mumbai.matic.today'],
              blockExplorerUrls: ['https://mumbai.polygonscan.com/']
            }]
          });
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  }
  
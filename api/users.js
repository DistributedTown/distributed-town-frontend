
const ethUtil = require('ethereumjs-util');

export const login = () => {
  const rawMessage = 'Some message';
  const msg = ethUtil.bufferToHex(new Buffer(rawMessage, 'utf8'));
  const address = web3.eth.accounts[0];
  const handleSignature = (err, signed) => {
    if (!err) {
      const fetchOpts = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, msg, signed })
      };

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, fetchOpts).then(res => {
        if (res.status >= 200 && res.status <= 300) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      }).then(json => {
        // Auth succeeded
      }).catch(err => {
        // Auth failed
      })
    }
  };

  web3.personal.sign(msg, address, handleSignature);

}

export const getUserInfo = () => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skillWallet?address=${window.ethereum.selectedAddress}`, {
    method: 'GET',
  })
    .then(res => res.json());
    // .then(arr => arr[0]);
};
export const fundUser = publicAddress => {
  return fetch('/api/getFunded', {
    method: 'POST',
    body: JSON.stringify({ publicAddress }),
  });
};


const ethUtil = require('ethereumjs-util');

export const login = () => {
  console.log('AiFillAliwaasdalsdasndqlfakd;wdngwan')
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
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    method: 'GET',
    headers: new Headers({
      skillWalletID:localStorage.getItem('skillWalletID')
    }),
  })
    .then(res => res.json());
    // .then(arr => arr[0]);
};

export const createUser = ({ username, communityID, skills }) => {
  const user = {
    username,
    communityID,
    skills,
  };
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: new Headers({
      // TODO: add token
      skillWalletID:localStorage.getItem('skillWalletID'),
      'Content-Type': 'application/json',
    }),
  }).then(res => res.json());
};

export const updateUserCommunityID = (communityID) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    method: 'PUT',
    body: JSON.stringify({ communityID }),
    headers: new Headers({
      skillWalletID:localStorage.getItem('skillWalletID'),
      'Content-Type': 'application/json',
    }),
  });
};

export const fundUser = publicAddress => {
  return fetch('/api/getFunded', {
    method: 'POST',
    body: JSON.stringify({ publicAddress }),
  });
};

export const getInvitation = async () =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/invite`, {
    method: 'GET',
    headers: {
      skillWalletID:localStorage.getItem('skillWalletID')
    },
  }).then(res => res.json());

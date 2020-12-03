import { useContext } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { useRouter } from 'next/router';
import { UserInfoContext } from '../../components/Store';

function QR() {
  const userInfo = useContext(UserInfoContext);
  const user = userInfo[0];
  const router = useRouter();
  return (
    <div className="flex w-full h-screen">
      <button
        className="absolute bg-white py-2 px-4 m-2 rounded"
        onClick={() => router.push('/skillwallet')}
      >
        Go back
      </button>
      <div className="flex flex-col px-40 py-64 justify-center items-center bg-denim w-1/2">
        <div className="bg-ripe-lemon w-56 h-56 p-4 flex justify-center items-center">
          <QRCode
            value={user._id}
            logoImage="/isologo.svg"
            logoWidth={60}
            logoHeight={60}
            bgColor="transparent"
            size={180}
          />
        </div>
        <div className="bg-white p-2 mt-10">
          Scan <span className="underline text-denim ">Wallet’s QR-Code</span>{' '}
          to verify new member.
        </div>
      </div>
      <div className="flex w-1/2 justify-center items-center">
        <div className="rounded border border-black py-12 px-8 flex flex-col justify-center items-center">
          <h3 className="text-2xl">Accepting Community</h3>
          <div className="bg-denim py-3 w-3/4 text-white text-center my-4">
            <p>DITO #23</p>
          </div>
          <h3 className="text-2xl mt-12 mb-4">Accepting Member</h3>
          <div className="bg-black p-4 flex justify-around items-center rounded-xl w-full">
            <p className="text-white flex flex-col">
              <span className="text-4xl">👨</span>
              <span>{user.username}</span>
            </p>
            <div className="flex flex-col w-1/2 p-3 items-center justify-start text-white">
              <span>DiTo</span>
              <img src="/dito-tokens.svg" />
              <h2 className="font-bold">
                {user.ditoBalance === -1
                  ? 'Loading dito balance...'
                  : user.ditoBalance || 0}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QR;

import { QRCode } from 'react-qrcode-logo';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { useGetDitoBalance } from '../../hooks/useGetDitoBalance';
import Card from '../../components/Card';
import { useGetCommunity } from '../../hooks/useGetCommunity';

function QR() {
  const { data: userInfo } = useGetUserInfo();
  const { data: ditoBalance } = useGetDitoBalance();
  const { data: community } = useGetCommunity();

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="flex flex-col p-8 justify-center items-center bg-denim md:w-1/2">
        <div className="bg-ripe-lemon w-56 h-56 p-4 flex justify-center items-center rounded-xl">
          {userInfo ? (
            <QRCode
              value={userInfo ? userInfo._id : '...'}
              logoImage="/isologo.svg"
              logoWidth={60}
              logoHeight={60}
              bgColor="transparent"
              size={180}
            />
          ) : (
            'Loading QR code.'
          )}
        </div>
        <Card className="bg-white p-2 mt-10">
          Scan Wallet’s QR-Code to verify new member.
        </Card>
      </div>
      <div className="flex md:w-1/2 p-8 justify-center items-center">
        <Card className="flex flex-col justify-center items-center">
          <h3 className="text-2xl">Accepting Community</h3>
          <Card filled className="my-4">
            <p>{community ? community.communityInfo.name : '...'}</p>
          </Card>
          <h3 className="text-2xl mb-4">Accepting Member</h3>
          <div className="bg-black p-4 flex justify-around items-center rounded-xl w-full">
            <p className="text-white flex flex-col justify-center items-center">
              <span className="text-4xl">👨</span>
              <span>{userInfo ? userInfo.username : '...'}</span>
            </p>
            <div className="flex flex-col w-1/2 p-3 items-center justify-start text-white">
              <span>DiTo</span>
              <img src="/dito-tokens.svg" />
              <h2 className="font-bold">
                {ditoBalance === -1
                  ? 'Loading dito balance...'
                  : ditoBalance || 0}
              </h2>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default QR;

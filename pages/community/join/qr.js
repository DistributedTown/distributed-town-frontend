import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { hasPendingAuthentication } from '../../../api/users';

function QR() {
  const [address, setAddress] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();
  const { communityName } = router.query;

  useEffect(() => {
    if (!address)
      setAddress(window.ethereum.selectedAddress)

    if (address)
      if (!isAuthenticated) {
        const longPoll = async () => {

          async function authenticationLongPoll(address, interval, pollAttemptsCount) {
            const hasPendingAuths = await hasPendingAuthentication(address);
            console.log(`poll ${pollAttemptsCount}`);
            setIsAuthenticated(!hasPendingAuths);
            if (hasPendingAuths && pollAttemptsCount > 0) {
              setTimeout(() => {
                authenticationLongPoll(address, interval, --pollAttemptsCount);
              }, interval);
            } else {
              return;
            }
          }
          await authenticationLongPoll(address, 3000, 20);
        }
        longPoll();
      } else {
        router.push(
          `/community/join/completed?communityName=${encodeURIComponent(
            communityName,
          )}`,
        );
      }
  }, [address, isAuthenticated])


  return (
    <div className="flex flex-col w-full h-screen md:flex-row">
      <div className="flex flex-col items-center justify-center p-8 bg-denim md:w-full">
        <div className="p-4 bg-ripe-lemon rounded-xl">
          {(
            <QRCode
              value={`{
                "address": "${address}",
                "hash":"wnGO5OQLkAEJ"
              }`}
              logoImage="/isologo.svg"
              bgColor="transparent"
              size={180}
              communityName={communityName}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default QR;

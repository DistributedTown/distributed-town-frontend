import { useEffect, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';

function QR() {
  const [address, setAddress] = useState();
  useEffect(() => {
    console.log(window.ethereum.selectedAddress);
    if (!address)
      setAddress(window.ethereum.selectedAddress)
  }, [address])
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
              // logoWidth={60}
              // logoHeight={60}
              bgColor="transparent"
              size={180}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default QR;

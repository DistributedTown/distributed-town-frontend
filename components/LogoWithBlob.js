import React from 'react';
import Logo from '../components/Logo';
import Blob from '../components/Blob';

const LogoWithBlob = () => {
    return (
      <div className="relative lg:absolute lg:overflow-hidden lg:h-96 w-72">
        <Logo className="relative z-10 p-8" />
        <Blob
          className="absolute opacity-70"
          style={{
            top: '-130px',
            left: '-70px',
            filter: 'blur(3.5px)',
            transform: 'scale(1.3)',
          }}
        />
      </div>
    );
  }

  export default LogoWithBlob;
import { createContext, useState, useEffect, useContext } from 'react';
import { Magic } from 'magic-sdk';

/* eslint-disable prefer-destructuring */
const NEXT_PUBLIC_RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
const NEXT_PUBLIC_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;

/* initializing context API values */
const MagicContext = createContext();

export const useMagic = () => {
  const [magic] = useContext(MagicContext);
  return magic;
};

/* this function wraps our entire app within our context APIs so they all have access to their values */
const Store = ({ children }) => {
  const [magic, setMagic] = useState();

  useEffect(() => {
    const network = !NEXT_PUBLIC_RPC_URL
      ? 'ropsten'
      : {
          rpcUrl: NEXT_PUBLIC_RPC_URL,
          chainId: NEXT_PUBLIC_CHAIN_ID,
        };

    /* We initialize Magic in `useEffect` so it has access to the global `window` object inside the browser */
    (async () => {
      const m = new Magic('pk_test_1C5A2BC69B7C18E5', {
        network,
      });

      m.user.getMetadata().then(res => console.log(res));

      setMagic(m);
    })();
  }, []);

  const loading = !magic;

  return (
    <>
      <div
        key="loading"
        className={`w-screen h-screen top-0 left-0 absolute bg-white grid place-content-center ${
          loading ? 'visible' : 'invisible'
        } transition-opacity opacity-${loading ? 100 : 0}`}
      >
        <div className="rounded w-5 h-5 bg-denim animate-spin" />
      </div>
      {!loading && (
        <MagicContext.Provider value={[magic]}>
          <div className="flex w-full h-full">{children}</div>
        </MagicContext.Provider>
      )}
    </>
  );
};

export default Store;

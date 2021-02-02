import '../tailwind.css';
// import MagicStore from '../components/MagicStore';
import '../public/App.css';
import ToastsProvider from '../components/ToastsProvider';

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }) {
  return (
    <ToastsProvider>
      <div className='flex w-full h-full"'>
        {pageProps.disableMagicLinks ? (
          <Component {...pageProps} />
        ) : (
            <Component {...pageProps} />
          )}
      </div>

    </ToastsProvider>
  );
}

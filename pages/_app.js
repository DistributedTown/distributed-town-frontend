import '../tailwind.css';
// import MagicStore from '../components/MagicStore';
import '../public/App.css';
import ToastsProvider from '../components/ToastsProvider';

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }) {
  return (
    <ToastsProvider>
      {pageProps.disableMagicLinks ? (
        <Component {...pageProps} />
      ) : (
        // <MagicStore>
          <Component {...pageProps} />
        // <MagicStore>
      )}
    </ToastsProvider>
  );
}

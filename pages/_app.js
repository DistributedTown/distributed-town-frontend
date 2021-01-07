import '../tailwind.css';
import Store from '../components/Store';
import '../public/App.css';
import ToastsProvider from '../components/ToastsProvider';

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }) {
  return (
    <ToastsProvider>
      <Store>
        <Component {...pageProps} />
      </Store>
    </ToastsProvider>
  );
}

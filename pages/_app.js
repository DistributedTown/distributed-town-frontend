import '../tailwind.css';
import Store from '../components/Store';
import '../public/App.css';
import ToastsProvider from '../components/ToastsProvider';

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }) {
  return (
    <div className="max-w-screen-xl mx-auto">
      <ToastsProvider>
        <Store>
          <Component {...pageProps} />
        </Store>
      </ToastsProvider>
    </div>
  );
}

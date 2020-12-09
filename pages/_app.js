import '../tailwind.css';

import Store from '../components/Store';
import '../public/App.css';

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }) {
  return (
    <div className="h-screen w-screen">
      <Store>
        <Component {...pageProps} />
      </Store>
    </div>
  );
}

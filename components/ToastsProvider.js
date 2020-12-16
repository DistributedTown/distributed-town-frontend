import { createContext, useContext, useState } from 'react';

const ToastsContext = createContext();

export const useShowToast = () => {
  const [, setToasts] = useContext(ToastsContext);

  const showToast = ({ message, severity = 'info', timeout = 4000 }) => {
    const timestamp = new Date().toUTCString();
    const toast = { message, severity, timestamp };

    setToasts(prev => [...prev, toast]);

    setTimeout(() => {
      setToasts(prev => [...prev.filter(t => t.timestamp !== toast.timestamp)]);
    }, timeout);
  };

  return showToast;
};

function ToastsProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  return (
    <ToastsContext.Provider value={[toasts, setToasts]}>
      <div className="fixed z-50 m-6 bottom-0 flex flex-col gap-3">
        {toasts.map(toast => (
          <Toast message={toast.message} severity={toast.severity} />
        ))}
      </div>
      {children}
    </ToastsContext.Provider>
  );
}

function Toast({ message, severity }) {
  const classes = 'rounded-lg ring ring-red-400 bg-white p-6';

  return <div className={classes}>{message}</div>;
}

export default ToastsProvider;

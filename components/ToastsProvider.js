import { createContext, useContext, useState } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';

const ToastsContext = createContext();

export const useShowToast = () => {
  const [, setToasts] = useContext(ToastsContext);

  const showToast = ({ message, severity = 'info', timeout = 5000 }) => {
    const timestamp = Date.now();
    const toast = { message, severity, timestamp };

    setToasts(prev => [...prev, toast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.timestamp !== timestamp));
    }, timeout);
  };

  return showToast;
};

function ToastsProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const duration = 300;
  const defaultStyle = {
    transition: `all ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`,
    opacity: 0,
    transform: 'translateX(0)',
  };
  const transitionStyles = {
    entering: { opacity: 0, transform: 'translateX(-50px)' },
    entered: { opacity: 1, transform: 'translateX(0)' },
    exiting: { opacity: 0, transform: 'translateX(-50px)' },
    exited: { opacity: 0 },
  };

  return (
    <ToastsContext.Provider value={[toasts, setToasts]}>
      <div className="fixed z-50 m-6 bottom-0 flex flex-col gap-3">
        <TransitionGroup component={null}>
          {toasts.map(toast => (
            <Transition key={toast.timestamp} in appear exit timeout={duration}>
              {state => (
                <Toast
                  message={toast.message}
                  severity={toast.severity}
                  style={{
                    ...defaultStyle,
                    ...transitionStyles[state],
                  }}
                />
              )}
            </Transition>
          ))}
        </TransitionGroup>
      </div>
      {children}
    </ToastsContext.Provider>
  );
}

function Toast({ message, severity, style }) {
  const classes = `rounded-lg ring ring-red-400 bg-white p-6`;

  return (
    <div className={classes} style={style}>
      {message}
    </div>
  );
}

export default ToastsProvider;

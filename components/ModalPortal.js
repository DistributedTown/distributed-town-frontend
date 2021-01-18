import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ModalPortal({
  children,
  className = 'root-portal',
  el = 'div',
}) {
  const [parent, setParent] = useState();

  useEffect(() => {
    const container = document.createElement(el);
    document.body.appendChild(container);
    container.classList.add(className);
    setParent(container);

    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return parent ? createPortal(children, parent) : null;
}

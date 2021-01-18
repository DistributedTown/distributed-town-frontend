import React from 'react';
import ModalPortal from './ModalPortal';

export default function Modal({ children, open, onClose }) {
  return (
    <ModalPortal>
      <div
        className={`z-50 fixed inset-0 bg-opacity-80 bg-black flex justify-center items-center ${
          open ? 'flex' : 'hidden'
        }`}
        onClick={e => e.currentTarget === e.target && onClose()}
      >
        {children}
      </div>
    </ModalPortal>
  );
}

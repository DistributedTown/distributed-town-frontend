import React from 'react';
import ModalPortal from './ModalPortal';

export default function Modal({ children, open, onClose }) {
  return (
    <ModalPortal>
      <div
        className={`fixed inset-0 h-screen w-screen max-w-full bg-opacity-50 bg-black flex justify-center items-center ${
          open ? 'flex' : 'hidden'
        }`}
        onClick={e => e.currentTarget === e.target && onClose()}
      >
        {children}
      </div>
    </ModalPortal>
  );
}

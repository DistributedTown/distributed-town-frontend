import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Button from '../Button';

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [circlePos, setCirclePos] = useState('80% 92%');

  const makeCirclePositionButtonCenter = el => {
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    setCirclePos(`${left + width / 2}px ${top + height / 2}px`);
  };

  return (
    <div className="sm:hidden">
      <div
        className="fixed z-50 p-4 text-white transition rounded-full shadow-lg bottom-8 right-8 bg-denim"
        onClick={() => setOpen(o => !o)}
        ref={makeCirclePositionButtonCenter}
      >
        {open ? <FaTimes size="1.6rem" /> : <FaBars size="1.6rem" />}
      </div>
      <div
        className="fixed z-40 flex flex-col justify-center w-screen h-screen gap-4 p-8 bg-white inset"
        style={{
          clipPath: `circle(${open ? 150 : 0}% at ${circlePos})`,
          transition: 'clip-path .3s ease-in-out',
        }}
      >
        <Button>FAQs</Button>
        <Button>Open App</Button>
        <Button filled>Create Community</Button>
      </div>
    </div>
  );
}

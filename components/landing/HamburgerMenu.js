import Link from 'next/link';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Button from '../Button';

export default function HamburgerMenu({ links = [] }) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(o => !o);
  const [circlePos, setCirclePos] = useState('80% 92%');
  const buttonRef = useRef();

  const moveCirclePosToButtonCenter = useCallback(
    debounce(() => {
      if (!buttonRef.current) return;
      const {
        left,
        top,
        width,
        height,
      } = buttonRef.current.getBoundingClientRect();
      setCirclePos(`${left + width / 2}px ${top + height / 2}px`);
    }, 50),
  );
  useEffect(() => {
    window.onresize = moveCirclePosToButtonCenter;
    moveCirclePosToButtonCenter();
  }, []);

  return (
    <div className="sm:hidden">
      <div
        className="fixed z-50 p-4 text-white transition rounded-full shadow-lg bottom-8 right-8 bg-denim"
        onClick={toggleOpen}
        ref={buttonRef}
      >
        {open ? <FaTimes size="1.6rem" /> : <FaBars size="1.6rem" />}
      </div>
      <div
        className="fixed z-40 flex flex-col justify-center w-screen h-screen p-8 space-y-4 bg-white inset"
        style={{
          clipPath: `circle(${open ? 150 : 0}% at ${circlePos})`,
          transition: 'clip-path .3s ease-in-out',
        }}
      >
        {links.map(l => (
          <Link href={l.href} key={l.title}>
            <Button>{l.title}</Button>
          </Link>
        ))}
        <Link href="/">
          <Button>Open App</Button>
        </Link>
      </div>
    </div>
  );
}

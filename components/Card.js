import classNames from 'classnames';

export default function Card({
  children,
  className,
  filled = false,
  color = 'denim',
  onClick,
}) {
  if (filled) {
    className += ' text-white';
  }
  const classes = classNames(
    'p-6',
    'border-2',
    `border-${color}`,
    'rounded-xl',
    {
      [`bg-white`]: !filled,
      [`bg-${color}`]: filled,
    },
    className,
  );

  return (
    <div onClick={onClick} className={classes}>
      {children}
    </div>
  );
}

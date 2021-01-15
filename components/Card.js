import classNames from 'classnames/dedupe';

export default function Card({
  children,
  className,
  filled = false,
  color = 'denim',
  outlined = false,
  onClick,
}) {
  const classes = classNames(
    'p-6',
    // 'border-2',
    'shadow',
    `border-${color}`,
    'rounded-xl',
    {
      'border-2': outlined,
      [`bg-white`]: !filled,
      [`bg-${color}`]: filled,
      'text-white': filled,
    },
    className,
  );

  return (
    <div onClick={onClick} className={classes}>
      {children}
    </div>
  );
}

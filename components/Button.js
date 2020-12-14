import classNames from 'classnames';

function Button({
  filled,
  color = 'denim',
  textColor = 'black',
  className,
  children,
  ...rest
}) {
  // TODO: Refactor
  if (filled) {
    textColor = 'white';
  }

  const classes = classNames(
    'px-4',
    'py-2',
    'rounded-lg',
    'border-2',
    'font-bold',
    'focus:outline-none',
    'focus:shadow-outline',
    `border-${color}`,
    `text-${textColor}`,
    // TODO: Hover doesn't work
    // { 'hover:bg-blue-700': filled },
    { [`bg-${color}`]: filled },
    className,
  );

  return (
    <button className={classes} type="button" {...rest}>
      {children}
    </button>
  );
}

export default Button;

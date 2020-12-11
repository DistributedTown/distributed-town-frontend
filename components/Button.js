import classNames from 'classnames';

function Button({
  filled,
  color = 'denim',
  textColor = 'black',
  className,
  children,
  ...rest
}) {
  const classes = classNames(
    'px-4',
    'py-2',
    'rounded-lg',
    'border-2',
    'font-bold',
    `border-${color}`,
    `text-${textColor}`,
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

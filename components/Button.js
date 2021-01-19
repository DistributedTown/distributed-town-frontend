import classNames from 'classnames';
import { FaCircleNotch } from 'react-icons/fa';

function Button({
  filled,
  color = 'denim',
  textColor = 'black',
  className,
  children,
  disabled,
  loading,
  icon,
  ...rest
}) {
  // TODO: Refactor
  if (filled) {
    textColor = 'white';
  }

  const isDisabled = disabled || loading;
  const classes = classNames(
    'px-4',
    'py-2',
    'rounded-lg',
    'border-2',
    'font-bold',
    'focus:outline-none',
    'focus:ring',
    'shadow',
    'hover:shadow-lg',
    'transition',
    { 'opacity-50': isDisabled },
    { 'cursor-not-allowed': isDisabled },
    `border-${color}`,
    `text-${textColor}`,
    // TODO: Hover doesn't work
    { 'bg-white': !filled },
    { [`bg-${color}`]: filled },
    className,
  );

  return (
    <button className={classes} type="button" disabled={isDisabled} {...rest}>
      <div className="flex items-center justify-center space-x-2">
        {loading && (
          <FaCircleNotch
            className={`animate-spin text-${filled ? 'white' : color}`}
          />
        )}
        {icon}
        <span>{children}</span>
      </div>
    </button>
  );
}

export default Button;

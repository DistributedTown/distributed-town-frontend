import classNames from 'classnames';
import { forwardRef } from 'react';

const TextField = forwardRef(({ name, className, ...rest }, ref) => {
  // TODO: Does this work?
  const classes = classNames(
    'border-2 border-denim rounded-lg px-4 py-2 focus:outline-none',
    className,
  );
  return <input className={classes} name={name} ref={ref} {...rest} />;
});

export default TextField;

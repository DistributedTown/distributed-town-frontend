import classNames from 'classnames';
import { forwardRef } from 'react';

const TextArea = forwardRef(
  ({ name, className, color = 'denim', ...rest }, ref) => {
    // TODO: Does this work?
    const classes = classNames(
      `border-2 border-${color} rounded-lg shadow-inner px-4 py-2 focus:outline-none`,
      className,
    );
    return <textarea className={classes} name={name} ref={ref} {...rest} />;
  },
);

export default TextArea;

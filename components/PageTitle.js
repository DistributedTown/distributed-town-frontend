import React from 'react';
import classNames from 'classnames';

export default function PageTitle({ children, className }) {
  const classes = classNames('font-black text-3xl', className);
  return <h1 className={classes}>{children}</h1>;
}

import classNames from 'classnames/dedupe';

const logoImage = '/dito-logo.svg';
export default function Logo({ className }) {
  const classes = classNames('p-8', className);
  return <img className={classes} src={logoImage} alt="Logo" />;
}

import classNames from 'classnames';

const logoImage = '/dito-logo.svg';
export default function Logo({ className }) {
  const classes = classNames(className);
  return <img className={classes} src={logoImage} alt="Logo" />;
}

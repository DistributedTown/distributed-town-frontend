import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import Button from '../Button';
import TextField from '../TextField';

const RegistrationForm = ({
  cta,
  onSubmit,
  setEmail,
  title,
  subtitle,
  placeholderText,
  email,
  className = '',
}) => (
  <div
    className={`max-w-sm  rounded w-full lg:max-w-full lg:flex ${className}`}
  >
    <Card>
      <div className="mb-8">
        <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{subtitle}</p>
      </div>
      <div className="flex items-center justify-center">
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit();
          }}
          className="flex flex-col gap-3"
        >
          <TextField
            id="email"
            type="email"
            value={email}
            placeholder={placeholderText}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Button filled type="submit">
            {cta}
          </Button>
        </form>
      </div>
    </Card>
  </div>
);

RegistrationForm.propTypes = {
  cta: PropTypes.string,
  onSubmit: PropTypes.func,
  setEmail: PropTypes.func,
  email: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  placeholderText: PropTypes.string,
};

export default RegistrationForm;

import React from 'react';
import PropTypes from 'prop-types';

const RegistrationForm = ({cta, onSubmit,setEmail, title, subtitle, placeholderText, email}) => (

<div className="max-w-sm  rounded w-full lg:max-w-full lg:flex">
  <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded p-4 flex flex-col justify-between leading-normal">
    <div className="mb-8">
<div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
<p className="text-gray-700 text-base">{subtitle}</p>
    </div>
    <div className="flex items-center justify-center">
    <form onSubmit={onSubmit}> 
      <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
        id="email" type="email" value = {email}
        placeholder={placeholderText} 
        onChange={(e) => setEmail(e.target.value)}
        required 
      />
      <button 
        className="bg-denim hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
        type="submit">
        {cta}
      </button>
      </form>
    </div>
  </div>
</div>
)

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
import React from 'react';

const NicknameSelection = ({
  title = '',
  subtitle = '',
  placeholderText = '',
  value = '',
  onChange,
}) => (
  <div className="flex flex-col items-center w-3/4">
    <div className="text-gray-900 font-bold text-3xl mb-8 text-center">
      {title}
    </div>
    <p className="text-center text-base text-3xl leading-8 mb-6">{subtitle}</p>
    <input
      className="w-64 bg-gray-200 text-center appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      id="nickname"
      type="text"
      value={value}
      placeholder={placeholderText}
      onChange={onChange}
      required
    />
  </div>
);
export default NicknameSelection;

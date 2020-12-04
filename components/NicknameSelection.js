import React from "react";
import PropTypes from "prop-types";

const NicknameSelection = ({
  setUserInfo,
  userInfo,
  value = "",
  title = "",
  subtitle = "",
  placeholderText = "",
  inputLabel = null
}) => (
  <div className="max-w-md h-full text-center flex flex-col justify-between pt-32 pb-64">
    <div className="px-8">
      <div className="text-gray-900 font-bold text-3xl mb-2">{title}</div>
      <p className="text-base text-3xl leading-8 mt-4">{subtitle}</p>
    </div>
    <div className="flex items-center">
      {inputLabel && (
        <label className="text-center text-rain-forest underline mr-4 text-xl">
          {inputLabel}
        </label>
      )}
      <input
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        id="nickname"
        type="text"
        value={value}
        placeholder={placeholderText}
        onChange={e => setUserInfo({ ...userInfo, username: e.target.value })}
        required
      ></input>
    </div>
  </div>
);
export default NicknameSelection;

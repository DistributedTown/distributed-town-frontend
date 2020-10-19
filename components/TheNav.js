import React from 'react'
import PropTypes from 'prop-types'

const TheNav = ({logoUrl, slogan = '', helpCta='', helpUrl='', links}) => (
<nav className="flex items-center justify-between flex-wrap p-6">
  <div className="flex flex-col items-end flex-shrink-0 block mr-6">
    <img src={ logoUrl} alt="DiTo Logo" /> 
    <span className="font-semibold text-sm  text-gray-500 tracking-tight pr-3">{slogan}</span>
  </div>
  <div className="block lg:hidden">
    <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
      <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div className="w-full block flex-grow lg:flex lg:items-center leading-none lg:w-auto">
    <div className="text-sm lg:flex-grow">
      {links.map((link, index)=> {
      return (
        <a key={index} href={link.url} className="uppercase block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-900  mr-4">
         {link.text}
       </a>
      );
      })}
    </div>
    <div>
      <a href={helpUrl} className="inline-block text-sm px-4 py-2 leading-none border bg-gray-500 rounded text-white hover:border-transparent hover:text-white-500 hover:bg-gray-600 mt-4 lg:mt-0">{helpCta}</a>
    </div>
  </div>
</nav>
);

TheNav.propTypes = {
    logoUrl: PropTypes.string,
    slogan: PropTypes.string,
    helpCta: PropTypes.string,
    helpUrl: PropTypes.string,
    links: PropTypes.array,
   };
 
 export default TheNav
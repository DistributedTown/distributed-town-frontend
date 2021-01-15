import React from 'react';

const Quote = ({ quote }) => (
  <blockquote className="p-4 text-xl italic border-l-4 bg-neutral-100 text-neutral-600 border-neutral-500 quote">
    <p className="mb-4 text-3xl">{quote}</p>
  </blockquote>
);

export default Quote;

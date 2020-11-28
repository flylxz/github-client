import { useState } from 'react';
import PropTypes from 'prop-types';

import { FaSistrix } from 'react-icons/fa';

export const Search = ({ setQuery }) => {
  const [text, setText] = useState('');

  const handleChange = (q) => {
    setText(q);
    setQuery(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className=' relative'>
      <input
        className='search-input'
        type='text'
        value={text}
        placeholder='Search repo'
        onChange={(e) => handleChange(e.target.value)}
      />
      <FaSistrix className='search-icon' />
    </form>
  );
};

Search.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

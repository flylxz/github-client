import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

// import debounce from 'lodash.debounce';

import { FaSistrix } from 'react-icons/fa';

export const Search = ({ setQuery }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setText(e.target.value);
    dispatch(setQuery(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setQuery(text));
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className=' relative'>
      <input
        className='search-input'
        type='text'
        value={text}
        placeholder='Search repo'
        onChange={handleChange}
      />
      <FaSistrix className='search-icon' />
    </form>
  );
};

Search.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

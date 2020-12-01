import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

export const ListItem = ({
  item: { id, full_name, stargazers_count },
  idx,
  fav,
  handleClick,
}) => {
  const isFav = !!fav.find((i) => i.id === id);

  return (
    <li onClick={() => handleClick(id)} className='space-btw center'>
      <p className='col-1 gap-1 right'>{idx + 1} </p>
      <p className='col-6 gap-1 break-text'>{full_name}</p>
      <p className='col-1 gap-1 right'>{stargazers_count}</p>
      <FaStar
        className='col-1 gap-1 right'
        size={24}
        color={isFav ? 'yellow' : 'white'}
      />
    </li>
  );
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  fav: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

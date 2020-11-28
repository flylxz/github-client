import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

export const ListItem = ({ item: { id, title, body }, fav, handleClick }) => {
  const isFav = !!fav.find((i) => i.id === id);

  return (
    <li onClick={() => handleClick(id)}>
      <h3>
        {id} - {title}
      </h3>
      <FaStar size={24} color={isFav ? 'yellow' : 'white'} />
      <p>{body.slice(0, 50)}</p>
    </li>
  );
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  fav: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

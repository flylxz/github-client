import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import { ItemCard } from '../components/';

export const Favorites = ({ fav, toggleFavorite }) => {
  return (
    <section className='container flex-wrap'>
      {fav.length > 0 &&
        fav.map((item) => (
          <ItemCard
            key={uuidv4()}
            item={item}
            fav={fav}
            handleClick={toggleFavorite}
          />
        ))}
    </section>
  );
};

Favorites.propTypes = {
  fav: PropTypes.array.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

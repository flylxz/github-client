import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import { ItemCard } from '../components/';

export const Favorites = ({ fav }) => {
  return (
    <section className='container flex-wrap'>
      {fav.length ? (
        fav.map((item) => <ItemCard key={uuidv4()} item={item} />)
      ) : (
        <h2>Please add something to favorites</h2>
      )}
    </section>
  );
};

Favorites.propTypes = {
  fav: PropTypes.array.isRequired,
};

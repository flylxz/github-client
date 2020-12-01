import { useState } from 'react';
import PropTypes from 'prop-types';

import { ItemCard, Search, InfiniteScrollComponent } from '../components';

export const Main = ({ data, fav, hasMore, handleNext, setQuery }) => {
  // console.log(data);

  const [choosenItem, setChoosenItem] = useState(null);

  const chooseItem = (id) => {
    const item = data.filter((repo) => repo.id === id);
    setChoosenItem(item[0]);
  };

  return (
    <div className='container space-btw'>
      <section className='col-1'>
        <Search setQuery={setQuery} />
        <ul className='block scroll'>
          <li className='tab-head space-btw center'>
            <p className='col-1 gap-1 right'>No</p>
            <p className='col-6  gap-1 center'>Repo</p>
            <p className='col-1 gap-1 right'>Stars</p>
            <p className='col-1 gap-1 right'>Fav</p>
          </li>
          <InfiniteScrollComponent
            data={data}
            fav={fav}
            hasMore={hasMore}
            chooseItem={chooseItem}
            handleNext={handleNext}
          />
        </ul>
      </section>
      <section className='col-1'>
        <ItemCard item={choosenItem} />
      </section>
    </div>
  );
};

Main.propTypes = {
  data: PropTypes.array.isRequired,
  fav: PropTypes.array.isRequired,
  hasMore: PropTypes.bool.isRequired,
  handleNext: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
};

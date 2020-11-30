import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import { ListItem, ItemCard, Search } from '../components';

export const Main = ({
  data,
  fav,
  hasMore,
  toggleFavorite,
  handleNext,
  setQuery,
  setPage,
}) => {
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
          <InfiniteScroll
            dataLength={data.length} //This is important field to render the next data
            next={handleNext}
            hasMore={hasMore}
            scrollThreshold={0.5}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {data.map((item, idx) => (
              <ListItem
                key={uuidv4()}
                item={item}
                idx={idx}
                fav={fav}
                handleClick={chooseItem}
              />
            ))}
          </InfiniteScroll>
        </ul>
      </section>
      <section className='col-1'>
        <ItemCard item={choosenItem} fav={fav} handleClick={toggleFavorite} />
      </section>
    </div>
  );
};

Main.propTypes = {
  data: PropTypes.array.isRequired,
  fav: PropTypes.array.isRequired,
  hasMore: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
};

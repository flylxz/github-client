import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import { ListItem, ItemCard, Search } from '../components/';

// git fetch -
// add redux -
// add search +-
// beautify -

export const Main = ({
  data,
  fav,
  hasMore,
  toggleFavorite,
  handleLoading,
  setQuery,
}) => {
  // console.log(data);

  const [choosenItem, setChoosenItem] = useState(null);

  const chooseItem = (id) => {
    const item = data.filter((repo) => repo.id === id);
    setChoosenItem(item[0]);
  };

  return (
    <div className='container space-btw'>
      <section className='col-1 p-1'>
        <Search setQuery={setQuery} />
        <ul className='block scroll'>
          <InfiniteScroll
            dataLength={data.length} //This is important field to render the next data
            next={handleLoading}
            hasMore={hasMore}
            scrollThreshold={0.5}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {data.map((item) => (
              <ListItem
                key={uuidv4()}
                item={item}
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
  handleLoading: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
};

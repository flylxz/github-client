import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import { ListItem } from '../components';

export const InfiniteScrollComponent = ({
  data,
  fav,
  hasMore,
  handleNext,
  chooseItem,
}) => {
  return (
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
  );
};

InfiniteScrollComponent.propTypes = {
  data: PropTypes.array,
  fav: PropTypes.array,
  hasMore: PropTypes.bool.isRequired,
  handleNext: PropTypes.func.isRequired,
  chooseItem: PropTypes.func.isRequired,
};

import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import { VscGithub } from 'react-icons/vsc';

import { Row } from '../styledComponents';

export const ItemCard = ({ item, fav, handleClick }) => {
  let isFav;
  if (item) isFav = !!fav.find((i) => i.id === item.id);

  return (
    <>
      {item && (
        <div>
          <Row>
            {item.title} <FaStar size={24} color='yellow' />
          </Row>
          <div>
            <Row>
              <h3>image</h3>
              <h4>
                {item.title}
                <VscGithub size={24} />
              </h4>
            </Row>
            <p>{item.body}</p>
            <button onClick={() => handleClick(item.id)}>
              {isFav ? 'Delete from favorites' : 'Add to favorites'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

ItemCard.propTypes = {
  item: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
};

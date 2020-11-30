import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import { VscGithub } from 'react-icons/vsc';

import { Button } from '../styledComponents';

export const ItemCard = ({ item, fav, handleClick }) => {
  let isFav;
  if (item) isFav = !!fav.find((i) => i.id === item.id);

  return (
    <>
      {item && (
        <div className='block card'>
          <div className='space-btw center p-1'>
            <div className='break-text'>{item.full_name}</div>
            <div className='center'>
              <FaStar size={24} color='yellow' />
              {item.stargazers_count}
            </div>
          </div>
          <hr />
          <div className='p-1'>
            <div className='space-btw center'>
              <img className='small' src={item.owner.avatar_url} alt='avatar' />

              <div className='center'>
                <p className='p-1-h'>{item.owner.login}</p>
                <VscGithub size={16} />
              </div>
            </div>
            <p className='p-1-v'>{item.description}</p>
            <Button onClick={() => handleClick(item.id)}>
              {isFav ? 'Delete from favorites' : 'Add to favorites'}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

ItemCard.propTypes = {
  item: PropTypes.object,
  fav: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

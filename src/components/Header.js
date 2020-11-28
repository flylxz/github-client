import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Header = ({ num }) => {
  return (
    <header className='space-btw'>
      <h2>GitHub Client</h2>

      <nav>
        <ul className='space-btw'>
          <li>
            <NavLink to='/' exact activeClassName='selected'>
              Top repo
            </NavLink>
          </li>
          <li>
            <NavLink to='/favorites' activeClassName='selected'>
              Favorite repo
            </NavLink>
            {num > 0 && <div>{num}</div>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  num: PropTypes.number.isRequired,
};

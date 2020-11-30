import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Badge } from '../styledComponents';

export const Header = ({ num }) => {
  return (
    <header className='space-btw center'>
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
            {num > 0 && <Badge>{num}</Badge>}
            {/* Budge not working */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  num: PropTypes.number.isRequired,
};

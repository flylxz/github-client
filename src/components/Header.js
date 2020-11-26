import { Link } from 'react-router-dom';

import { Row } from '../styledComponents';

export const Header = () => {
  return (
    <header>
      <Row>
        <h2>GitHub Client</h2>

        <nav>
          <Row>
            <li>
              <Link to='/'>Top repo</Link>
            </li>
            <li>
              <Link to='/favorites'>Favorite repo</Link>
            </li>
          </Row>
        </nav>
      </Row>
    </header>
  );
};

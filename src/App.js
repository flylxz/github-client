import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchData } from './redux/actions';

import { Header } from './components';
import { Main, Favorites } from './pages';

// cleaning and refactoring -

export const App = () => {
  const dispatch = useDispatch();
  const { fav, loading, error, query, page } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchData());
  }, [page, query]);

  return (
    <div className='App'>
      <Router>
        <Header num={fav.length} />
        {loading ? (
          <div className='overlay'>
            <h2 className='loading'>Loading...</h2>
          </div>
        ) : error ? (
          <div className='overlay'>
            <h2 className='error'>{error}</h2>
          </div>
        ) : (
          <Switch>
            <Route path='/' exact>
              <Main />
            </Route>
            <Route path='/favorites'>
              <Favorites fav={fav} />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
};

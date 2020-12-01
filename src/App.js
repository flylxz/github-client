import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { useGithub } from './hooks/useGithub';

import {
  fetchData,
  setPage,
  setQuery,
  setHasMore,
  setFav,
} from './redux/actions';

import { Header } from './components';
import { Main, Favorites } from './pages';

// search -
// infinite loading -
// rewrite to class component -
// cleaning -

export const App = () => {
  const dispatch = useDispatch();
  const {
    data,
    fav,
    dataCount,
    hasMore,
    loading,
    error,
    query,
    page,
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchData());
  }, [page, query]);

  const handleNext = () => {
    if (page < Math.ceil(dataCount / 20)) {
      dispatch(setPage((page) => page + 1));
      dispatch(fetchData());
    } else dispatch(setHasMore(false));
  };

  const toggleFavorite = (id) => {
    const exist = fav.find((i) => i.id === id);
    if (exist) {
      dispatch(setFav(fav.filter((i) => i.id !== id)));
    } else {
      dispatch(setFav([...fav, data.find((i) => i.id === id)]));
    }
  };

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
              <Main
                data={data}
                fav={fav}
                isFav={setFav}
                hasMore={hasMore}
                toggleFavorite={toggleFavorite}
                handleNext={handleNext}
                setQuery={setQuery}
                setPage={setPage}
              />
            </Route>
            <Route path='/favorites'>
              <Favorites fav={fav} toggleFavorite={toggleFavorite} />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
};

import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { useGithub } from './hooks/useGithub';

import { Header } from './components';
import { Main, Favorites } from './pages';

export const App = () => {
  const { data, getData, page, setPage, dataCount, setQuery } = useGithub();
  const [fav, setFav] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const handleNext = () => {
    if (page < Math.ceil(dataCount / 20)) {
      setPage((page) => page + 1);
      getData();
    } else setHasMore(false);
  };

  const toggleFavorite = (id) => {
    const exist = fav.find((i) => i.id === id);
    if (exist) {
      setFav(fav.filter((i) => i.id !== id));
    } else {
      setFav([...fav, data.find((i) => i.id === id)]);
    }
  };

  return (
    <div className='App'>
      <Router>
        <Header num={fav.length} />
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
      </Router>
    </div>
  );
};

import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { useGithub } from './hooks/useGithub';

import { Header } from './components';
import { Main, Favorites } from './pages';

function App() {
  const { data, getData, setPage, dataCount, setQuery } = useGithub();
  const [fav, setFav] = useState([
    {
      body:
        'quia et suscipit↵suscipit recusandae consequuntur expedita et cum↵reprehenderit molestiae ut ut quas totam↵nostrum rerum est autem sunt rem eveniet architecto',
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      userId: 1,
    },
    {
      body:
        'et iusto sed quo iure↵voluptatem occaecati omnis eligendi aut ad↵voluptatem doloribus vel accusantium quis pariatur↵molestiae porro eius odio et labore et velit aut',
      id: 3,
      title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
      userId: 1,
    },
  ]);
  const [hasMore, setHasMore] = useState(true);

  const handleLoading = () => {
    if (data.length < dataCount - 1) {
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
              handleLoading={handleLoading}
              setQuery={setQuery}
            />
          </Route>
          <Route path='/favorites'>
            <Favorites fav={fav} toggleFavorite={toggleFavorite} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

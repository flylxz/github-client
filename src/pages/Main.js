import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useGithub } from '../hooks/useGithub';

import { ListItem, ItemCard } from '../components/';

import { Section, Row } from '../styledComponents';

// add search, add fav page

export const Main = () => {
  const { repos, getData, setPage, reposItem } = useGithub();
  // console.log(repos);

  const [hasMore, setHasMore] = useState(true);
  const [choosenItem, setChoosenItem] = useState(null);
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

  const handleLoading = () => {
    if (repos.length < reposItem - 1) {
      setPage((page) => page + 1);
      getData();
    } else setHasMore(false);
  };

  const chooseItem = (id) => {
    const item = repos.filter((repo) => repo.id === id);
    setChoosenItem(item[0]);
  };

  const toggleFavorite = (id) => {
    const exist = fav.find((x) => x.id === id);
    if (exist) {
      setFav(fav.filter((i) => i.id !== id));
    } else {
      setFav((fav) => [...fav, repos.find((i) => i.id === id)]);
    }
  };

  return (
    <Row>
      <Section>
        <ul>
          <InfiniteScroll
            dataLength={repos.length} //This is important field to render the next data
            next={handleLoading}
            hasMore={hasMore}
            scrollThreshold={0.5}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {repos.map((item) => (
              <ListItem
                key={item.id + item.title}
                item={item}
                fav={fav}
                handleClick={chooseItem}
              />
            ))}
          </InfiniteScroll>
        </ul>
      </Section>
      <Section>
        <ItemCard item={choosenItem} fav={fav} handleClick={toggleFavorite} />
      </Section>
    </Row>
  );
};

import { useState, useEffect, useCallback } from 'react';

export const useGithub = () => {
  const [repos, setRepos] = useState([]);
  const [reposItem, setReposItem] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const getData = useCallback(async () => {
    // const _apiUrl = 'https://api.github.com/';
    // let url = `${_apiUrl}repositories`;

    let url = `https://jsonplaceholder.typicode.com/posts`;

    if (query) {
      url += `?${query}`;
    } else {
      url += `?&_page=${page}&_limit=20`;
      //   url += `&page=${page}&per_page=10`;
    }

    // console.log(url);

    try {
      const res = await fetch(url);
      const data = await res.json();
      setReposItem(res.headers.get('X-Total-Count'));
      setRepos([...repos, ...data]);
    } catch (error) {
      console.log('error: ', error);
    }
  }, [query, page]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { repos, getData, page, setPage, setQuery, reposItem };
};

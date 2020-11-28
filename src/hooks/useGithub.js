import { useState, useEffect, useCallback } from 'react';

export const useGithub = () => {
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const getData = useCallback(async () => {
    // const _apiUrl = 'https://api.github.com/';
    // let url = `${_apiUrl}repositories`;

    let url = `https://jsonplaceholder.typicode.com/posts`;

    if (query) {
      url += `?q=${query}`;
    } else {
      url += `?&_page=${page}&_limit=20`;
      //   url += `&page=${page}&per_page=10`;
    }

    console.log(url);

    try {
      const res = await fetch(url);
      const resData = await res.json();
      if (query.length) {
        setData(resData);
      } else {
        setData([...data, ...resData]);
      }
      setDataCount(res.headers.get('X-Total-Count'));
    } catch (error) {
      console.log('error: ', error);
    }
  }, [query, page]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, getData, page, setPage, setQuery, dataCount };
};

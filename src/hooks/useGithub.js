import { useState, useEffect, useCallback } from 'react';

const accessToken = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN || '';

export const useGithub = () => {
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const getData = useCallback(async () => {
    const _apiUrl = 'https://api.github.com/';
    let url = `${_apiUrl}search/repositories`;

    if (query.length) {
      setPage(1);
      url += `?q=${query}&sort=stars&page=${page}&per_page=20&access_token=${accessToken}`;
    } else {
      url += `?q=created:>2020-01-01&sort=stars&page=${page}&per_page=20&access_token=${accessToken}`;
    }

    // console.log(url);

    try {
      const res = await fetch(url);
      const resData = await res.json();

      if (page === 1) {
        setData(() => resData.items);
        setDataCount(() => resData.total_count);
      } else {
        setData([...data, ...resData.items]);
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  }, [query, page]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, getData, page, setPage, setQuery, dataCount };
};

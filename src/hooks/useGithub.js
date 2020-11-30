import { useState, useEffect, useCallback } from 'react';

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
      url += `?q=${query}&page=${page}&per_page=20&access_token=f58feb00dc1d3dc8685386e795d239579b23b580`;
    } else {
      url += `?q=created:>2020-01-01&sort=stars&page=${page}&per_page=20&access_token=f58feb00dc1d3dc8685386e795d239579b23b580`;
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

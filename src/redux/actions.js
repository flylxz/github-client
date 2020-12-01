import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_NEXT_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  SET_PAGE,
  SET_QUERY,
  SET_HAS_MORE,
  SET_FAV,
} from './types';

const accessToken = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN || '';

// const _apiUrl = 'https://api.github.com/';
// let url = `${_apiUrl}search/repositories`;

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchNextDataSuccess = (data) => ({
  type: FETCH_NEXT_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

export const setPage = (page) => ({ type: SET_PAGE, payload: page });

export const setQuery = (query) => ({ type: SET_QUERY, payload: query });

export const setHasMore = (hasMore) => ({
  type: SET_HAS_MORE,
  payload: hasMore,
});

export const setFav = (fav) => ({ type: SET_FAV, payload: fav });

export const fetchData = () => async (dispatch, getState) => {
  const { data, page, query } = getState();

  const _apiUrl = 'https://api.github.com/';
  let url = `${_apiUrl}search/repositories`;

  if (query.length) {
    setPage(1);
    url += `?q=${query}&sort=stars&page=${page}&per_page=20&access_token=${accessToken}`;
  } else {
    url += `?q=created:>2020-01-01&sort=stars&page=${page}&per_page=20&access_token=${accessToken}`;
  }

  dispatch(fetchDataRequest);
  try {
    const res = await fetch(url);
    const resData = await res.json();

    if (page === 1) {
      const data = resData.items;
      const dataCount = resData.total_count;
      dispatch(fetchDataSuccess({ data, dataCount }));
    } else {
      dispatch(fetchNextDataSuccess([...data, ...resData.items]));
    }
  } catch (error) {
    const errorMsg = error.message;
    dispatch(fetchDataFailure(errorMsg));
  }
};

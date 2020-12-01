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

const initialState = {
  data: [],
  dataCount: 0,
  fav: [],
  page: 1,
  query: '',
  hasMore: true,
  loading: true,
  error: '',
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return { ...state, loading: true };

    case FETCH_DATA_SUCCESS:
      const { data, dataCount } = action.payload;
      return { ...state, data, dataCount, loading: false };

    case FETCH_NEXT_DATA_SUCCESS:
      return { ...state, data: action.payload, loading: false };

    case FETCH_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case SET_PAGE:
      return { ...state, page: action.payload };

    case SET_QUERY:
      return { ...state, query: action.payload };

    case SET_HAS_MORE:
      return { ...state, hasMore: action.payload };

    case SET_FAV:
      return { ...state, fav: action.payload };

    default:
      return state;
  }
};

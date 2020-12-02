import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_NEXT_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  SET_FAV,
  TOGGLE_FAV,
  SET_PAGE,
  SET_QUERY,
  SET_HAS_MORE,
  SET_LODAING_NEXT,
} from './types';

const initialState = {
  data: [],
  dataCount: 0,
  fav: [],
  page: 1,
  totalPages: 1,
  query: '',
  hasMore: true,
  loading: true,
  error: '',
};

const toggleFavorite = (state, item) => {
  const { fav } = state;
  const exist = fav.find((i) => i.id === item.id);
  if (exist) {
    return { ...state, fav: fav.filter((i) => i.id !== item.id) };
  } else {
    // return { ...state, fav: [...fav, data.find((i) => i.id === id)] };
    return { ...state, fav: [...fav, item] };
  }
};

const handleNext = (state) => {
  if (state.page < state.totalPages) return { ...state, page: state.page + 1 };
  else return { ...state, hasMore: false };
};

const setPage = (state, page = undefined) => {
  console.log(page);
  if (page) return { ...state, page };
  else return { ...state, page: state.page + 1 };
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return { ...state, loading: true };

    case FETCH_DATA_SUCCESS:
      const { data, dataCount, totalPages } = action.payload;
      return { ...state, data, dataCount, totalPages, loading: false };

    case FETCH_NEXT_DATA_SUCCESS:
      return { ...state, data: action.payload, loading: false };

    case FETCH_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case SET_PAGE:
      return setPage(state, action.payload);

    case SET_QUERY:
      return { ...state, query: action.payload, page: 1, hasMore: true };

    case SET_HAS_MORE:
      return { ...state, hasMore: action.payload };

    case SET_LODAING_NEXT:
      return handleNext(state);

    case SET_FAV:
      return { ...state, fav: action.payload };

    case TOGGLE_FAV:
      const item = action.payload;
      return toggleFavorite(state, item);

    default:
      return state;
  }
};

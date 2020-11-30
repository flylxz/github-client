

const initialState = {
  data: [],
  fav: [],
  hasMore: true,
  isLoading: true,
  error: false,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case :
      return { ...state };

    default:
      return state;
  }
};

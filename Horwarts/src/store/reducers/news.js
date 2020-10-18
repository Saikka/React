import * as actionTypes from '../actions/actionTypes';

const initialState = {
  news: [],
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_NEWS_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case actionTypes.FETCH_NEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        news: action.news
      };
    case actionTypes.FETCH_NEWS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;

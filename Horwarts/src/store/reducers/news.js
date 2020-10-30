import * as actionTypes from '../actions/actionTypes';

const initialState = {
  news: [],
  loading: false,
  isDone: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_NEWS_START:
      return {
        ...state,
        error: null,
        loading: true,
        isDone: false
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
    case actionTypes.ADD_NEWS_SUCCESS:
      return {
        ...state,
        isDone: true,
        news: state.news.concat(action.news)
      };
    case actionTypes.EDIT_NEWS_SUCCESS:
      const updatedNews = [...state.news];
      let id;
      const singleNews = {
        ...updatedNews.find((news, index) => {
          if (news._id === action.id) {
            id = index;
            return news;
          }
        }),
        ...action.news
      };
      updatedNews[id] = singleNews;
      return {
        ...state,
        news: updatedNews,
        isDone: true,
        error: null
      };
    case actionTypes.DELETE_NEWS_SUCCESS:
      return {
        ...state,
        news: state.news.filter((el) => el._id !== action.id)
      };
    case actionTypes.EDIT_NEWS_FAIL:
    case actionTypes.ADD_NEWS_FAIL:
    case actionTypes.DELETE_NEWS_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;

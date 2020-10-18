import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchNewsStart = () => {
  return {
    type: actionTypes.FETCH_NEWS_START
  };
};

export const fetchNewsSuccess = (news) => {
  return {
    type: actionTypes.FETCH_NEWS_SUCCESS,
    news: news
  };
};

export const fetchNewsFail = (error) => {
  return {
    type: actionTypes.FETCH_NEWS_FAIL,
    error: error
  };
};

export const fetchNews = () => {
  return (dispatch) => {
    dispatch(fetchNewsStart());
    axios
      .get('/news')
      .then((res) => {
        dispatch(fetchNewsSuccess(res.data.news));
      })
      .catch((err) => {
        dispatch(fetchNewsFail(err));
      });
  };
};

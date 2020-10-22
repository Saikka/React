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

export const addNewsStart = () => {
  return {
    type: actionTypes.ADD_NEWS_START
  };
};

export const addNewsSuccess = (news) => {
  return {
    type: actionTypes.ADD_NEWS_SUCCESS,
    news: news
  };
};

export const addNewsFail = (error) => {
  return {
    type: actionTypes.ADD_NEWS_FAIL,
    error: error
  };
};

export const addNews = (news) => {
  return (dispatch) => {
    dispatch(addNewsStart());
    axios
      .post('/news/add-news', news)
      .then((res) => {
        dispatch(addNewsSuccess(res.data.news));
      })
      .catch((err) => {
        dispatch(addNewsFail(err));
      });
  };
};

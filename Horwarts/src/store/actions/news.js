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
        console.log(err);
        dispatch(fetchNewsFail(err));
      });
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
    axios
      .post('/news/add', news)
      .then((res) => {
        dispatch(addNewsSuccess(res.data.news));
      })
      .catch((err) => {
        dispatch(addNewsFail(err));
      });
  };
};

export const editNewsSuccess = (id, news) => {
  return {
    type: actionTypes.EDIT_NEWS_SUCCESS,
    id: id,
    news: news
  };
};

export const editNewsFail = (error) => {
  return {
    type: actionTypes.EDIT_NEWS_FAIL,
    error: error
  };
};

export const editNews = (id, news) => {
  return (dispatch) => {
    axios
      .put('/news/edit/' + id, news)
      .then((response) => {
        dispatch(editNewsSuccess(id, response.data.news));
      })
      .catch((error) => {
        dispatch(editNewsFail(error));
      });
  };
};

export const deleteNewsSuccess = (id) => {
  return {
    type: actionTypes.DELETE_NEWS_SUCCESS,
    id: id
  };
};

export const deleteNewsFail = (error) => {
  return {
    type: actionTypes.DELETE_NEWS_FAIL,
    error: error
  };
};

export const deleteNews = (id) => {
  return (dispatch) => {
    axios
      .delete('/news/delete/' + id)
      .then((response) => {
        dispatch(deleteNewsSuccess(response.data.id));
      })
      .catch((error) => {
        dispatch(deleteNewsFail(error));
      });
  };
};

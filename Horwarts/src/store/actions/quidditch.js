import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { deleteNewsFail } from './news';

export const fetchMatchesSuccess = (matches) => {
  return {
    type: actionTypes.FETCH_MATCHES_SUCCESS,
    matches: matches
  };
};

export const fetchMatchesFail = (error) => {
  return {
    type: actionTypes.FETCH_MATCHES_FAIL,
    error: error
  };
};

export const fetchMatchesStart = () => {
  return {
    type: actionTypes.FETCH_MATCHES_START
  };
};

export const fetchMatches = () => {
  return (dispatch) => {
    dispatch(fetchMatchesStart());
    axios
      .get('/quidditch')
      .then((response) => {
        dispatch(fetchMatchesSuccess(response.data.matches));
      })
      .catch((error) => {
        dispatch(addMatchFail(error.message));
      });
  };
};

export const addMatchSuccess = (match) => {
  return {
    type: actionTypes.ADD_MATCH_SUCCESS,
    match: match
  };
};

export const addMatchFail = (error) => {
  return {
    type: actionTypes.ADD_MATCH_FAIL,
    error: error
  };
};

export const addMatch = (match) => {
  return (dispatch) => {
    axios
      .post('/quidditch/add', match)
      .then((response) => {
        dispatch(addMatchSuccess(response.data.match));
      })
      .catch((error) => {
        dispatch(addMatchFail(error.message));
      });
  };
};

export const editMatchSuccess = (id, match) => {
  return {
    type: actionTypes.EDIT_MATCH_SUCCESS,
    id: id,
    match: match
  };
};

export const editMatchFail = (error) => {
  return {
    type: actionTypes.EDIT_MATCH_FAIL,
    error: error
  };
};

export const editMatch = (id, match) => {
  return (dispatch) => {
    axios
      .put('/quidditch/edit/' + id, match)
      .then((response) => {
        dispatch(editMatchSuccess(id, response.data.match));
      })
      .catch((error) => {
        dispatch(editMatchFail(error.message));
      });
  };
};

export const deleteMatchSuccess = (id) => {
  return {
    type: actionTypes.DELETE_MATCH_SUCCESS,
    id: id
  };
};

export const deleteMatchFail = (error) => {
  return {
    type: actionTypes.DELETE_MATCH_FAIL,
    error: error
  };
};

export const deleteMatch = (id) => {
  return (dispatch) => {
    axios
      .delete('/quidditch/delete/' + id)
      .then((response) => {
        dispatch(deleteMatchSuccess(response.data.id));
      })
      .catch((error) => {
        dispatch(deleteNewsFail(error.message));
      });
  };
};

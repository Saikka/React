import * as actionTypes from './actionTypes';
import axios from '../../axios';

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
    dispatch(fetchMatchesStart);
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

export const addMatchStart = () => {
  return {
    type: actionTypes.ADD_MATCH_START
  };
};

export const addMatch = (match) => {
  return (dispatch) => {
    dispatch(addMatchStart());
    axios
      .post('/quidditch/add-match', match)
      .then((response) => {
        dispatch(addMatchSuccess(response.data.match));
      })
      .catch((error) => {
        dispatch(addMatchFail(error.message));
      });
  };
};

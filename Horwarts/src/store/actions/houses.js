import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchHousesStart = () => {
  return {
    type: actionTypes.FETCH_HOUSES_START
  };
};

export const fetchHousesSuccess = (houses) => {
  return {
    type: actionTypes.FETCH_HOUSES_SUCCESS,
    houses: houses
  };
};

export const fetchHousesFail = (error) => {
  return {
    type: actionTypes.FETCH_HOUSES_FAIL,
    error: error
  };
};

export const fetchHouses = () => {
  return (dispatch) => {
    dispatch(fetchHousesStart());
    axios
      .get('/houses/names')
      .then((res) => {
        dispatch(fetchHousesSuccess(res.data.houses));
      })
      .catch((err) => {
        dispatch(fetchHousesFail(err));
      });
  };
};

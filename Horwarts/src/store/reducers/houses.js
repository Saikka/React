import * as actionTypes from '../actions/actionTypes';

const initialState = {
  houses: [],
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_HOUSES_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case actionTypes.FETCH_HOUSES_SUCCESS:
      return {
        ...state,
        loading: false,
        houses: action.houses
      };
    case actionTypes.FETCH_HOUSES_FAIL:
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

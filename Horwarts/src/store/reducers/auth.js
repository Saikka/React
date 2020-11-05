import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        token: action.token,
        loading: false
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        token: null
      };
    default:
      return state;
  }
};

export default reducer;

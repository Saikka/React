import * as actionTypes from '../actions/actionTypes';

const initialState = {
  matches: [],
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MATCHES_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_MATCHES_SUCCESS:
      return {
        ...state,
        loading: false,
        matches: action.matches
      };
    case actionTypes.FETCH_MATCHES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.ADD_MATCH_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.ADD_MATCH_SUCCESS: {
      return {
        ...state,
        matches: state.matches.concat(action.match),
        loading: false
      };
    }
    case actionTypes.ADD_MATCH_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    default:
      return state;
  }
};

export default reducer;

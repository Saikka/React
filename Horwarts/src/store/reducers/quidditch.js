import * as actionTypes from '../actions/actionTypes';

const initialState = {
  matches: [],
  loading: false,
  isDone: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MATCHES_START:
      return {
        ...state,
        loading: true,
        isDone: false
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
    case actionTypes.ADD_MATCH_SUCCESS: {
      return {
        ...state,
        matches: state.matches.concat(action.match),
        isDone: true
      };
    }
    case actionTypes.EDIT_MATCH_SUCCESS: {
      let id;
      const updatedMatches = [...state.matches];
      const updatedMatch = {
        ...updatedMatches.find((el, index) => {
          if (el._id === action.id) {
            id = index;
            return el;
          }
        }),
        ...action.match
      };
      updatedMatches[id] = updatedMatch;
      return {
        ...state,
        matches: updatedMatches,
        isDone: true
      };
    }
    case actionTypes.DELETE_MATCH_SUCCESS: {
      return {
        ...state,
        matches: state.matches.filter((el) => el._id !== action.id)
      };
    }
    case actionTypes.ADD_MATCH_FAIL:
    case actionTypes.EDIT_MATCH_FAIL:
    case actionTypes.DELETE_MATCH_FAIL: {
      return {
        ...state,
        error: action.error
      };
    }
    default:
      return state;
  }
};

export default reducer;

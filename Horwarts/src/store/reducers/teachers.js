import * as actionTypes from '../actions/actionTypes';

const initialState = {
  teachers: [],
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TEACHERS_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_TEACHERS_SUCCESS:
      return {
        ...state,
        loading: false,
        teachers: action.teachers
      };
    case actionTypes.FETCH_TEACHERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.ADD_TEACHER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.ADD_TEACHER_SUCCESS:
      return {
        ...state,
        loading: false,
        teachers: state.teachers.concat(action.teacher)
      };
    case actionTypes.FETCH_HOUSES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
  }
};

export default reducer;

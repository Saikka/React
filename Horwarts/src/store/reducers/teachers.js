import * as actionTypes from '../actions/actionTypes';

const initialState = {
  teachers: [],
  loading: false,
  isDone: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TEACHERS_START:
      return {
        ...state,
        loading: true,
        isDone: false
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
    case actionTypes.ADD_TEACHER_SUCCESS:
      return {
        ...state,
        isDone: true,
        teachers: state.teachers.concat(action.teacher)
      };
    case actionTypes.EDIT_TEACHER_SUCCESS:
      let id;
      const updatedTeachers = [...state.teachers];
      const updatedTeacher = {
        ...updatedTeachers.find((el, index) => {
          if (el._id === action.id) {
            id = index;
            return el;
          } else {
            return null;
          }
        }),
        ...action.teacher
      };
      updatedTeachers[id] = updatedTeacher;
      return {
        ...state,
        isDone: true,
        teachers: updatedTeachers
      };
    case actionTypes.DELETE_TEACHER_SUCCESS:
      return {
        ...state,
        teachers: state.teachers.filter((el) => el._id !== action.id)
      };
    case actionTypes.ADD_TEACHER_FAIL:
    case actionTypes.EDIT_TEACHER_FAIL:
    case actionTypes.DELETE_TEACHER_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;

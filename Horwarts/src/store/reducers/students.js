import * as actionTypes from '../actions/actionTypes';

const initialState = {
  students: [],
  loading: false,
  isDone: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STUDENTS_START:
      return {
        ...state,
        loading: true,
        isDone: false
      };
    case actionTypes.FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        students: action.students
      };
    case actionTypes.FETCH_STUDENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.ADD_STUDENT_SUCCESS:
      return {
        ...state,
        isDone: true,
        students: state.students.concat(action.student)
      };
    case actionTypes.EDIT_STUDENT_SUCCESS:
      let id;
      const updatedTeachers = [...state.students];
      const updatedTeacher = {
        ...updatedTeachers.find((el, index) => {
          if (el._id === action.id) {
            id = index;
            return el;
          } else {
            return null;
          }
        }),
        ...action.student
      };
      updatedTeachers[id] = updatedTeacher;
      return {
        ...state,
        isDone: true,
        students: updatedTeachers
      };
    case actionTypes.DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        students: state.students.filter((el) => el._id !== action.id)
      };
    case actionTypes.ADD_STUDENT_FAIL:
    case actionTypes.EDIT_STUDENT_FAIL:
    case actionTypes.DELETE_STUDENT_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;

import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchTeachersSuccess = (teachers) => {
  return {
    type: actionTypes.FETCH_TEACHERS_SUCCESS,
    teachers: teachers
  };
};

export const fetchTeachersFail = (error) => {
  return {
    type: actionTypes.FETCH_TEACHERS_FAIL,
    error: error
  };
};

export const fetchTeachersStart = () => {
  return {
    type: actionTypes.FETCH_TEACHERS_START
  };
};

export const fetchTeachers = () => {
  return (dispatch) => {
    dispatch(fetchTeachersStart());
    axios
      .get('/teachers')
      .then((response) => {
        dispatch(fetchTeachersSuccess(response.data.teachers));
      })
      .catch((error) => {
        dispatch(fetchTeachersFail(error));
      });
  };
};

export const addTeacherSuccess = (teacher) => {
  return {
    type: actionTypes.ADD_TEACHER_SUCCESS,
    teacher: teacher
  };
};

export const addTeacherFail = (error) => {
  return {
    type: actionTypes.ADD_TEACHER_FAIL,
    error: error
  };
};

export const addTeacherStart = () => {
  return {
    type: actionTypes.ADD_TEACHER_START
  };
};

export const addTeacher = (teacher) => {
  return (dispatch) => {
    dispatch(addTeacherStart());
    axios
      .post('/teachers/add-teacher', teacher)
      .then((response) => {
        dispatch(addTeacherSuccess(response.data.teacher));
      })
      .catch((error) => {
        dispatch(addTeacherFail(error));
      });
  };
};

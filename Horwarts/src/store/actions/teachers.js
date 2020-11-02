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

export const addTeacher = (teacher) => {
  return (dispatch) => {
    axios
      .post('/teachers/add', teacher)
      .then((response) => {
        dispatch(addTeacherSuccess(response.data.teacher));
      })
      .catch((error) => {
        dispatch(addTeacherFail(error));
      });
  };
};

export const editTeacherSuccess = (id, teacher) => {
  return {
    type: actionTypes.EDIT_TEACHER_SUCCESS,
    teacher: teacher,
    id: id
  };
};

export const editTeacherFail = (error) => {
  return {
    type: actionTypes.EDIT_TEACHER_FAIL,
    error: error
  };
};

export const editTeacher = (id, teacher) => {
  return (dispatch) => {
    axios
      .put('/teachers/edit/' + id, teacher)
      .then((response) => {
        dispatch(editTeacherSuccess(id, response.data.teacher));
      })
      .catch((error) => {
        dispatch(editTeacherFail(error));
      });
  };
};

export const deleteTeacherSuccess = (id) => {
  return {
    type: actionTypes.DELETE_TEACHER_SUCCESS,
    id: id
  };
};

export const deleteTeacherFail = (error) => {
  return {
    type: actionTypes.DELETE_TEACHER_FAIL,
    error: error
  };
};

export const deleteTeacher = (id) => {
  return (dispatch) => {
    axios
      .delete('/teachers/delete/' + id)
      .then((response) => {
        dispatch(deleteTeacherSuccess(response.data.id));
      })
      .catch((error) => {
        dispatch(deleteTeacherFail(error));
      });
  };
};

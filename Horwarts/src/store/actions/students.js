import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchStudentsSuccess = (students) => {
  return {
    type: actionTypes.FETCH_STUDENTS_SUCCESS,
    students: students
  };
};

export const fetchStudentsFail = (error) => {
  return {
    type: actionTypes.FETCH_STUDENTS_FAIL,
    error: error
  };
};

export const fetchStudentsStart = () => {
  return {
    type: actionTypes.FETCH_STUDENTS_START
  };
};

export const fetchStudents = () => {
  return (dispatch) => {
    dispatch(fetchStudentsStart());
    axios
      .get('/students')
      .then((response) => {
        dispatch(fetchStudentsSuccess(response.data.students));
      })
      .catch((error) => {
        dispatch(fetchStudentsFail(error));
      });
  };
};

export const addStudentSuccess = (student) => {
  return {
    type: actionTypes.ADD_STUDENT_SUCCESS,
    student: student
  };
};

export const addStudentFail = (error) => {
  return {
    type: actionTypes.ADD_STUDENT_FAIL,
    error: error
  };
};

export const addStudent = (student) => {
  return (dispatch) => {
    axios
      .post('/students/add', student)
      .then((response) => {
        dispatch(addStudentSuccess(response.data.student));
      })
      .catch((error) => {
        dispatch(addStudentFail(error));
      });
  };
};

export const editStudentSuccess = (id, student) => {
  return {
    type: actionTypes.EDIT_STUDENT_SUCCESS,
    student: student,
    id: id
  };
};

export const editStudentFail = (error) => {
  return {
    type: actionTypes.EDIT_STUDENT_FAIL,
    error: error
  };
};

export const editStudent = (id, student) => {
  return (dispatch) => {
    axios
      .put('/students/edit/' + id, student)
      .then((response) => {
        dispatch(editStudentSuccess(id, response.data.student));
      })
      .catch((error) => {
        dispatch(editStudentFail(error));
      });
  };
};

export const deleteStudentSuccess = (id) => {
  return {
    type: actionTypes.DELETE_STUDENT_SUCCESS,
    id: id
  };
};

export const deleteStudentFail = (error) => {
  return {
    type: actionTypes.DELETE_STUDENT_FAIL,
    error: error
  };
};

export const deleteStudent = (id) => {
  return (dispatch) => {
    axios
      .delete('/students/delete/' + id)
      .then((response) => {
        dispatch(deleteStudentSuccess(response.data.id));
      })
      .catch((error) => {
        dispatch(deleteStudentFail(error));
      });
  };
};

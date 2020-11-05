import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import classes from './StudentsList.module.css';
import * as actions from '../../../store/actions';
import axios from '../../../axios';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import LayoutScroll from '../../UI/Layouts/LayoutScroll/LayoutScroll';
import Spinner from '../../UI/Spinner/Spinner';

class StudentsList extends Component {
  componentDidMount() {
    this.props.onFetchStudents();
  }

  storeStudentsHandler = () => {
    localStorage.setItem('students', JSON.stringify(this.props.students));
  };

  render() {
    let table = <Spinner />;
    if (!this.props.loading) {
      table = (
        <table>
          <tbody>
            {this.props.students.map((el) => (
              <tr key={el._id}>
                <td>{el.firstname + ' ' + el.lastname}</td>
                <td>
                  <NavLink
                    to={this.props.match.path + '/' + el._id}
                    key='edit'
                    onClick={this.storeStudentsHandler}
                  >
                    EDIT
                  </NavLink>
                </td>
                <td onClick={() => this.props.onDeleteStudent(el._id)}>
                  DELETE
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return (
      <LayoutScroll>
        <div className={classes.StudentsList}>
          <h1>List of students</h1>
          {table}
        </div>
      </LayoutScroll>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students.students,
    loading: state.students.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchStudents: () => dispatch(actions.fetchStudents()),
    onDeleteStudent: (id) => dispatch(actions.deleteStudent(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(StudentsList, axios));

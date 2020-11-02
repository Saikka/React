import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import classes from './TeachersList.module.css';
import * as actions from '../../../store/actions';
import axios from '../../../axios';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import LayoutScroll from '../../UI/Layouts/LayoutScroll/LayoutScroll';
import Spinner from '../../UI/Spinner/Spinner';

class TeachersList extends Component {
  componentDidMount() {
    this.props.onFetchTeaches();
  }

  storeTeachersHandler = () => {
    localStorage.setItem('teachers', JSON.stringify(this.props.teachers));
  };

  render() {
    let table = <Spinner />;
    if (!this.props.loading) {
      table = (
        <table>
          <tbody>
            {this.props.teachers.map((el) => (
              <tr key={el._id}>
                <td>{el.firstname + ' ' + el.lastname}</td>
                <td>
                  <NavLink
                    to={this.props.match.path + '/' + el._id}
                    key='edit'
                    onClick={this.storeTeachersHandler}
                  >
                    EDIT
                  </NavLink>
                </td>
                <td onClick={() => this.props.onDeleteTeacher(el._id)}>
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
        <div className={classes.TeachersList}>
          <h1>List of teachers</h1>
          {table}
        </div>
      </LayoutScroll>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teachers: state.teachers.teachers,
    loading: state.teachers.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTeaches: () => dispatch(actions.fetchTeachers()),
    onDeleteTeacher: (id) => dispatch(actions.deleteTeacher(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(TeachersList, axios));

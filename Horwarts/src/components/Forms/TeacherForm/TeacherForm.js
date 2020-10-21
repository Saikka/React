import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './TeacherForm.module.css';
import LayoutScroll from '../../UI/Layouts/LayoutScroll/LayoutScroll';
import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner';

class TeacherForm extends Component {
  state = {
    form: {
      firstname: {
        label: 'Firstname',
        value: ''
      },
      lastname: {
        label: 'Lastname',
        value: ''
      },
      subject: {
        label: 'Subject',
        value: ''
      },
      classrom: {
        label: 'Classroom',
        value: 0
      }
    }
  };
  render() {
    const formElements = [];
    for (let key in this.state.form) {
      formElements.push({
        id: key,
        team: this.state.form[key]
      });
    }
    let form = <Spinner />;
    return (
      <LayoutScroll>
        <div className={classes.TeacherForm}></div>
      </LayoutScroll>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.teachers.loading
  };
};

export default connect(mapStateToProps)(TeacherForm);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './TeacherForm.module.css';
import * as actions from '../../../store/actions';
import LayoutScroll from '../../UI/Layouts/LayoutScroll/LayoutScroll';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

class TeacherForm extends Component {
  state = {
    form: {
      firstname: {
        label: 'Firstname',
        value: '',
        type: 'text'
      },
      lastname: {
        label: 'Lastname',
        value: '',
        type: 'text'
      },
      subject: {
        label: 'Subject',
        value: '',
        type: 'text'
      },
      classrom: {
        label: 'Classroom',
        value: 0,
        type: 'number'
      }
    }
  };

  inputChangedHandler = (event, controlName) => {
    const updatedForm = {
      ...this.state.form,
      [controlName]: {
        ...this.state.form[controlName],
        value: event.target.value
      }
    };
    this.setState({ form: updatedForm });
  };

  addTeacherHandler = (event) => {
    event.preventDefault();
    const teacher = {
      firstname: this.state.form.firstname.value,
      lastname: this.state.form.lastname.value,
      subject: this.state.form.subject.value,
      classroom: this.state.form.classrom.value
    };
    this.props.onAddTeacher(teacher);
  };

  render() {
    const formElements = [];
    for (let key in this.state.form) {
      formElements.push({
        id: key,
        config: this.state.form[key]
      });
    }
    let form = (
      <form
        className={classes.TeacherForm}
        onSubmit={(event) => this.addTeacherHandler(event)}
      >
        <h1>Add a teacher</h1>
        {formElements.map((el) => (
          <Input
            key={el.id}
            elementType='input'
            label={el.config.label}
            type={el.config.type}
            value={el.config.value}
            changed={(event) => this.inputChangedHandler(event, el.id)}
          />
        ))}
        <Button name='Add' />
      </form>
    );
    return <LayoutScroll>{form}</LayoutScroll>;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.teachers.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTeacher: (teacher) => dispatch(actions.addTeacher(teacher))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherForm);

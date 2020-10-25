import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './TeacherForm.module.css';
import * as actions from '../../../store/actions';
import { checkValidity } from '../Validation';
import LayoutScroll from '../../UI/Layouts/LayoutScroll/LayoutScroll';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

class TeacherForm extends Component {
  state = {
    form: {
      firstname: {
        label: 'Firstname',
        value: '',
        type: 'text',
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      },
      lastname: {
        label: 'Lastname',
        value: '',
        type: 'text',
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      },
      subject: {
        label: 'Subject',
        value: '',
        type: 'text',
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      },
      classrom: {
        label: 'Classroom',
        value: '',
        type: 'text',
        validation: {
          required: true,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      image: {
        label: 'Classroom',
        value: null,
        type: 'file',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false
  };

  inputChangedHandler = (event, controlName) => {
    let value = event.target.value;
    if (controlName === 'image') {
      value = event.target.files[0];
    }
    const updatedForm = {
      ...this.state.form,
      [controlName]: {
        ...this.state.form[controlName],
        value: value,
        valid: checkValidity(
          event.target.value,
          this.state.form[controlName].validation
        )
      }
    };
    let formIsValid = true;
    for (let el in updatedForm) {
      formIsValid = updatedForm[el].valid && formIsValid;
    }
    this.setState({ form: updatedForm, formIsValid: formIsValid });
  };

  inputTouchedHandler = (controlName) => {
    const updatedForm = {
      ...this.state.form,
      [controlName]: {
        ...this.state.form[controlName],
        touched: true
      }
    };
    this.setState({ form: updatedForm });
  };

  addTeacherHandler = (event) => {
    event.preventDefault();
    const teacher = new FormData();
    teacher.append('firstname', this.state.form.firstname.value);
    teacher.append('lastname', this.state.form.lastname.value);
    teacher.append('subject', this.state.form.subject.value);
    teacher.append('classroom', this.state.form.classrom.value);
    teacher.append('image', this.state.image);
    this.props.onAddTeacher(teacher);
  };

  render() {
    console.log(this.state.form);
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
            invalid={!el.config.valid}
            touched={el.config.touched}
            changed={(event) => this.inputChangedHandler(event, el.id)}
            blured={() => this.inputTouchedHandler(el.id)}
          />
        ))}
        <Button name='Add' disabled={!this.state.formIsValid} />
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

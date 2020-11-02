import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './TeacherForm.module.css';
import * as actions from '../../../store/actions';
import { checkValidity } from '../Validation';
import axios from '../../../axios';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
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
      classroom: {
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
        label: 'Image',
        value: null,
        type: 'file',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    isEdit: false,
    id: null
  };

  componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.setForm();
    }
  }

  componentDidMount() {
    this.setForm();
  }

  setForm = () => {
    let teacher;
    let isValid = false;
    let isEdit = false;
    if (this.props.match.path.includes('edit')) {
      let teachers;
      isEdit = true;
      if (this.props.teachers.length === 0) {
        teachers = JSON.parse(localStorage.getItem('teachers'));
      } else {
        teachers = this.props.teachers;
      }
      teacher = teachers.find((el) => el._id === this.props.match.params.id);
      isValid = true;
    } else {
      teacher = { firstname: '', lastname: '', subject: '', classroom: '' };
    }
    const updatedForm = {
      ...this.state.form,
      firstname: {
        ...this.state.form.firstname,
        value: teacher.firstname,
        valid: isValid
      },
      lastname: {
        ...this.state.form.lastname,
        value: teacher.lastname,
        valid: isValid
      },
      subject: {
        ...this.state.form.subject,
        value: teacher.subject,
        valid: isValid
      },
      classroom: {
        ...this.state.form.classroom,
        value: teacher.classroom,
        valid: isValid
      }
    };
    this.setState({
      form: updatedForm,
      formIsValid: isValid,
      id: this.props.match.params.id,
      isEdit: isEdit
    });
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
    teacher.append('classroom', this.state.form.classroom.value);
    teacher.append('image', this.state.form.image.value);
    if (this.state.isEdit) {
      this.props.onEditTeacher(this.state.id, teacher);
      localStorage.removeItem('teachers');
    } else {
      this.props.onAddTeacher(teacher);
    }
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
        <h1>{this.state.isEdit ? 'Edit teacher' : 'Add a new teacher'}</h1>
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
        <Button
          name={this.state.isEdit ? 'Edit' : 'Add'}
          disabled={!this.state.formIsValid}
        />
      </form>
    );
    return (
      <LayoutScroll>
        {this.props.isDone ? <Redirect to='/manage/teachers/edit' /> : null}
        {form}
      </LayoutScroll>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.teachers.loading,
    teachers: state.teachers.teachers,
    isDone: state.teachers.isDone
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTeacher: (teacher) => dispatch(actions.addTeacher(teacher)),
    onEditTeacher: (id, teacher) => dispatch(actions.editTeacher(id, teacher)),
    onFetchTeachers: () => dispatch(actions.fetchTeachers())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(TeacherForm, axios));

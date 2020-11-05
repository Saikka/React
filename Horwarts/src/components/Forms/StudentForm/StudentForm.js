import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './StudentForm.module.css';
import * as actions from '../../../store/actions';
import { checkValidity } from '../Validation';
import axios from '../../../axios';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import LayoutScroll from '../../UI/Layouts/LayoutScroll/LayoutScroll';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';

class StudentForm extends Component {
  state = {
    form: {
      firstname: {
        label: 'Firstname',
        elementType: 'input',
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
        elementType: 'input',
        value: '',
        type: 'text',
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      },
      house: {
        label: 'House',
        elementType: 'select',
        value: '5f883a808ff1d31cc473bf6e',
        validation: {},
        valid: true,
        touched: false
      },
      year: {
        label: 'Year',
        elementType: 'input',
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
        elementType: 'input',
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
    this.props.onFetchHouses();
    this.setForm();
  }

  setForm = () => {
    let student;
    let isValid = false;
    let isEdit = false;
    if (this.props.match.path.includes('edit')) {
      let students;
      isEdit = true;
      if (this.props.students.length === 0) {
        students = JSON.parse(localStorage.getItem('students'));
      } else {
        students = this.props.students;
      }
      student = students.find((el) => el._id === this.props.match.params.id);
      isValid = true;
    } else {
      student = {
        firstname: '',
        lastname: '',
        house: '5f883a808ff1d31cc473bf6e',
        year: ''
      };
    }
    const updatedForm = {
      ...this.state.form,
      firstname: {
        ...this.state.form.firstname,
        value: student.firstname,
        valid: isValid
      },
      lastname: {
        ...this.state.form.lastname,
        value: student.lastname,
        valid: isValid
      },
      house: {
        ...this.state.form.house,
        value: student.house,
        valid: true
      },
      year: {
        ...this.state.form.year,
        value: student.year,
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

  addStudentHandler = (event) => {
    event.preventDefault();
    const student = new FormData();
    student.append('firstname', this.state.form.firstname.value);
    student.append('lastname', this.state.form.lastname.value);
    student.append('house', this.state.form.house.value);
    student.append('year', this.state.form.year.value);
    student.append('image', this.state.form.image.value);
    if (this.state.isEdit) {
      this.props.onEditStudent(this.state.id, student);
      localStorage.removeItem('students');
    } else {
      this.props.onAddStudent(student);
    }
  };

  render() {
    let form = <Spinner />;
    if (!this.props.loading) {
      const formElements = [];
      for (let key in this.state.form) {
        formElements.push({
          id: key,
          config: this.state.form[key]
        });
      }
      form = (
        <form
          className={classes.StudentForm}
          onSubmit={(event) => this.addStudentHandler(event)}
        >
          <h1>{this.state.isEdit ? 'Edit student' : 'Add a new student'}</h1>
          {formElements.map((el) => (
            <Input
              key={el.id}
              elementType={el.config.elementType}
              label={el.config.label}
              type={el.config.elementType !== 'select' ? el.config.type : null}
              options={
                el.config.elementType === 'select' ? this.props.houses : null
              }
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
    }
    return (
      <LayoutScroll>
        {this.props.isDone ? <Redirect to='/manage/students/edit' /> : null}
        {form}
      </LayoutScroll>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    houses: state.houses.houses,
    loading: state.houses.loading,
    students: state.students.students,
    isDone: state.students.isDone
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchHouses: () => dispatch(actions.fetchHouses()),
    onAddStudent: (student) => dispatch(actions.addStudent(student)),
    onEditStudent: (id, student) => dispatch(actions.editStudent(id, student)),
    onFetchStudents: () => dispatch(actions.fetchStudents())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(StudentForm, axios));

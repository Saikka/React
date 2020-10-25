import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './NewsForm.module.css';
import * as actions from '../../../store/actions';
import { checkValidity } from '../Validation';
import LayoutScroll from '../../UI/Layouts/LayoutScroll/LayoutScroll';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

class NewsForm extends Component {
  state = {
    form: {
      title: {
        label: 'Title',
        value: '',
        type: 'text',
        elementType: 'input',
        validation: {
          required: true,
          minLength: 5
        },
        valid: false,
        touched: false
      },
      content: {
        label: 'Content',
        value: '',
        elementType: 'textarea',
        validation: {
          required: true,
          minLength: 15
        },
        valid: false,
        touched: false
      },
      author: {
        label: 'Author',
        value: '',
        type: 'text',
        elementType: 'input',
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false
  };

  inputChangedHandler = (event, controlName) => {
    const updatedForm = {
      ...this.state.form,
      [controlName]: {
        ...this.state.form[controlName],
        value: event.target.value,
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

  addTeacherHandler = (event) => {
    event.preventDefault();
    const article = {
      title: this.state.form.title.value,
      content: this.state.form.content.value,
      author: this.state.form.author.value,
      date: new Date()
    };
    this.props.onAddArticle(article);
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
        className={classes.NewsForm}
        onSubmit={(event) => this.addTeacherHandler(event)}
      >
        <h1>Add a new article</h1>
        {formElements.map((el) => (
          <Input
            key={el.id}
            elementType={el.config.elementType}
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
    loading: state.news.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddArticle: (article) => dispatch(actions.addNews(article))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsForm);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './NewsForm.module.css';
import * as actions from '../../../store/actions';
import LayoutScroll from '../../UI/Layouts/LayoutScroll/LayoutScroll';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { act } from 'react-dom/test-utils';

class NewsForm extends Component {
  state = {
    form: {
      title: {
        label: 'Title',
        value: '',
        type: 'text',
        elementType: 'input'
      },
      content: {
        label: 'Content',
        value: '',
        elementType: 'textarea'
      },
      author: {
        label: 'Author',
        value: '',
        type: 'text',
        elementType: 'input'
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
    const article = {
      title: this.state.form.title.value,
      content: this.state.form.content.value,
      author: this.state.form.author.value,
      date: new Date()
    };
    this.props.onAddArticle(article);
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
    loading: state.news.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddArticle: (article) => dispatch(actions.addNews(article))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsForm);

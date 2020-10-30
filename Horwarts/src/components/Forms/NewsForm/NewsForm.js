import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
    let news;
    let isValid = false;
    let isEdit = false;
    if (this.props.match.path.includes('edit')) {
      let allNews;
      isEdit = true;
      if (this.props.news.length === 0) {
        allNews = JSON.parse(localStorage.getItem('news'));
      } else {
        allNews = this.props.news;
      }
      news = allNews.find((el) => el._id === this.props.match.params.id);
      isValid = true;
    } else {
      news = { title: '', content: '', author: '' };
    }
    const updatedForm = {
      ...this.state.form,
      title: {
        ...this.state.form.title,
        value: news.title,
        valid: isValid
      },
      content: {
        ...this.state.form.content,
        value: news.content,
        valid: isValid
      },
      author: {
        ...this.state.form.author,
        value: news.author,
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
    if (this.state.isEdit) {
      this.props.onEditArticle(this.state.id, article);
    } else {
      this.props.onAddArticle(article);
    }
    localStorage.removeItem('news');
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
        <h1>{this.state.isEdit ? 'Edit news' : 'Add news'}</h1>
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
        <Button
          name={this.state.isEdit ? 'Edit' : 'Add'}
          disabled={!this.state.formIsValid}
        />
      </form>
    );
    return (
      <LayoutScroll>
        {this.props.isDone ? <Redirect to='/manage/news/edit' /> : null}
        {form}
      </LayoutScroll>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDone: state.news.isDone,
    news: state.news.news
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddArticle: (article) => dispatch(actions.addNews(article)),
    onEditArticle: (id, article) => dispatch(actions.editNews(id, article))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsForm);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

import classes from './MatchForm.module.css';
import * as actions from '../../../store/actions';
import { checkValidity } from '../Validation';
import LayoutScroll from '../../UI/Layouts/LayoutScroll/LayoutScroll';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';

class MatchForm extends Component {
  state = {
    form: {
      team1: {
        name: {
          value: '5f883a808ff1d31cc473bf6e',
          validation: {},
          valid: true
        },
        score: {
          value: 0,
          validation: {
            isPositive: true
          },
          valid: true,
          touched: false
        }
      },
      team2: {
        name: {
          value: '5f883a808ff1d31cc473bf6e',
          validation: {},
          valid: true
        },
        score: {
          value: 0,
          validation: {
            isPositive: true
          },
          valid: true,
          touched: false
        }
      }
    },
    formIsValid: true,
    date: moment(),
    focused: false,
    isNew: true,
    isEdit: false,
    id: null
  };

  componentDidMount() {
    this.props.onFetchHouses();
    this.setForm();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.setForm();
    }
  }

  setForm = () => {
    let match;
    let isEdit = false;
    let date = moment();
    let isNew = true;
    if (this.props.match.path.includes('edit')) {
      let matches;
      isEdit = true;
      if (this.props.matches.length === 0) {
        matches = JSON.parse(localStorage.getItem('matches'));
      } else {
        matches = this.props.matches;
      }
      match = matches.find((el) => el._id === this.props.match.params.id);
      date = moment(match.date);
      if (date < moment()) {
        isNew = false;
      }
    } else {
      match = {
        team1: { house: { _id: this.state.form.team1.name.value }, score: 0 },
        team2: { house: { _id: this.state.form.team2.name.value }, score: 0 }
      };
    }
    const updatedForm = {
      ...this.state.form,
      team1: {
        name: {
          ...this.state.form.team1.name,
          value: match.team1.house._id
        },
        score: {
          ...this.state.form.team1.score,
          value: match.team1.score,
          valid: match.team1.score >= 0 ? true : false
        }
      },
      team2: {
        name: {
          ...this.state.form.team2.name,
          value: match.team2.house._id
        },
        score: {
          ...this.state.form.team2.score,
          value: match.team2.score,
          valid: match.team2.score >= 0 ? true : false
        }
      }
    };
    let isValid = true;
    if (!this.state.isNew) {
      isValid =
        true && updatedForm.team1.score.valid && updatedForm.team2.score.valid;
    }
    this.setState({
      form: updatedForm,
      id: this.props.match.params.id,
      isEdit: isEdit,
      isNew: isNew,
      date: date,
      formIsValid: isValid
    });
  };

  inputChangedHandler = (event, teamName, optionName) => {
    const updatedForm = {
      ...this.state.form,
      [teamName]: {
        ...this.state.form[teamName],
        [optionName]: {
          ...this.state.form[teamName][optionName],
          value: event.target.value,
          valid: checkValidity(
            event.target.value,
            this.state.form[teamName][optionName].validation
          )
        }
      }
    };
    let isValid = true;
    if (!this.state.isNew) {
      isValid =
        true && updatedForm.team1.score.valid && updatedForm.team2.score.valid;
    }
    this.setState({ form: updatedForm, formIsValid: isValid });
  };

  dateChangedHandler = (date) => {
    this.setState({ date: date });
    if (date < moment()) {
      this.setState({ isNew: false });
    } else {
      this.setState({ isNew: true });
    }
  };

  inputTouchedHandler = (teamName, optionName) => {
    const updatedForm = {
      ...this.state.form,
      [teamName]: {
        ...this.state.form[teamName],
        [optionName]: {
          ...this.state.form[teamName][optionName],
          touched: true
        }
      }
    };
    this.setState({ form: updatedForm });
  };

  addMatchHandler = (event) => {
    event.preventDefault();
    const match = {
      team1: {
        house: this.state.form.team1.name.value,
        score: this.state.form.team1.score.value
      },
      team2: {
        house: this.state.form.team2.name.value,
        score: this.state.form.team2.score.value
      },
      date: this.state.date
    };
    if (this.state.isEdit) {
      this.props.onEditMatch(this.state.id, match);
    } else {
      this.props.onAddMatch(match);
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
    if (!this.props.loading) {
      form = (
        <form
          className={classes.MatchForm}
          onSubmit={(event) => this.addMatchHandler(event)}
        >
          <h1>{this.state.isEdit ? 'Edit match' : 'Add a new match'}</h1>
          <SingleDatePicker
            date={this.state.date}
            onDateChange={(date) => this.dateChangedHandler(date)}
            focused={this.state.focused}
            onFocusChange={({ focused }) => this.setState({ focused })}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <div className={classes.MainContainer}>
            <div>
              <Input
                elementType='select'
                value={this.state.form.team1.name.value}
                options={this.props.houses}
                changed={(event) =>
                  this.inputChangedHandler(event, 'team1', 'name')
                }
              />
              {!this.state.isNew ? (
                <Input
                  elementType='input'
                  type='number'
                  value={this.state.form.team1.score.value}
                  invalid={!this.state.form.team1.score.valid}
                  touched={this.state.form.team1.score.touched}
                  changed={(event) =>
                    this.inputChangedHandler(event, 'team1', 'score')
                  }
                  blured={() => this.inputTouchedHandler('team1', 'score')}
                />
              ) : null}
            </div>
            <div>
              <h1>VS</h1>
            </div>
            <div>
              <Input
                elementType='select'
                value={this.state.form.team2.name.value}
                options={this.props.houses}
                changed={(event) =>
                  this.inputChangedHandler(event, 'team2', 'name')
                }
              />
              {!this.state.isNew ? (
                <Input
                  elementType='input'
                  type='number'
                  value={this.state.form.team2.score.value}
                  invalid={!this.state.form.team2.score.valid}
                  touched={this.state.form.team2.score.touched}
                  changed={(event) =>
                    this.inputChangedHandler(event, 'team2', 'score')
                  }
                  blured={() => this.inputTouchedHandler('team2', 'score')}
                />
              ) : null}
            </div>
          </div>
          <Button
            name={this.state.isEdit ? 'Edit' : 'Add'}
            disabled={!this.state.formIsValid}
          />
        </form>
      );
    }
    return (
      <LayoutScroll>
        {this.props.isDone ? <Redirect to='/manage/matches/edit' /> : null}
        {form}
      </LayoutScroll>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    houses: state.houses.houses,
    loading: state.houses.loading,
    matches: state.quidditch.matches,
    isDone: state.quidditch.isDone
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchHouses: () => dispatch(actions.fetchHouses()),
    onAddMatch: (match) => dispatch(actions.addMatch(match)),
    onEditMatch: (id, match) => dispatch(actions.editMatch(id, match))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchForm);

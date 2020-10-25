import React, { Component } from 'react';
import { connect } from 'react-redux';
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
          valid: false,
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
          valid: false,
          touched: false
        }
      }
    },
    formIsValid: true,
    date: moment(),
    focused: false,
    isNew: true
  };

  componentDidMount() {
    this.props.onFetchHouses();
  }

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
    const isValid =
      this.state.isFormValid && updatedForm[teamName][optionName].valid;
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
    this.props.onAddMatch(match);
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
          <h1>Add a new match</h1>
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
          <Button name='Add' disabled={!this.state.formIsValid} />
        </form>
      );
    }
    return <LayoutScroll>{form}</LayoutScroll>;
  }
}

const mapStateToProps = (state) => {
  return {
    houses: state.houses.houses,
    loading: state.houses.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchHouses: () => dispatch(actions.fetchHouses()),
    onAddMatch: (match) => dispatch(actions.addMatch(match))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchForm);

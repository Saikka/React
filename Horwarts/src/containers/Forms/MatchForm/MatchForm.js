import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-min.module.css';
import 'react-datetime/css/react-datetime.css';

import classes from './MatchForm.module.css';
import * as actions from '../../../store/actions';
import Layout from '../../../components/UI/Layouts/Layout/Layout';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class MatchForm extends Component {
  state = {
    form: {
      team1: {
        name: {
          value: '5f883a808ff1d31cc473bf6e'
        },
        score: {
          value: 0
        }
      },
      team2: {
        name: {
          value: '5f883a808ff1d31cc473bf6e'
        },
        score: {
          value: 0
        }
      }
    },
    date: {
      value: moment().toDate()
    }
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
          value: event.target.value
        }
      }
    };
    this.setState({ form: updatedForm });
  };

  dateChangedHandler = (date) => {
    console.log(date);
    const newDate = {
      ...this.state.date,
      value: date
    };
    this.setState({ date: newDate });
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
      date: this.state.date.value
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
        <form className={classes.MatchForm} onSubmit={this.addMatchHandler}>
          <h1>Add new match</h1>
          {formElements.map((el) => (
            <div key={el.id}>
              <select
                value={this.state.form[el.id].name.value}
                onChange={(event) =>
                  this.inputChangedHandler(event, el.id, 'name')
                }
              >
                {this.props.houses.map((house) => (
                  <option key={house.name} value={house._id}>
                    {house.name}
                  </option>
                ))}
              </select>
              <input
                type='number'
                value={this.state.form[el.id].score.value}
                onChange={(event) =>
                  this.inputChangedHandler(event, el.id, 'score')
                }
              />
            </div>
          ))}
          <DatePicker
            selected={this.state.date.value}
            onChange={this.dateChangedHandler}
            dateFormat='dd/MM/yyyy'
          />
          <Button name='Add' />
        </form>
      );
    }
    return <Layout>{form}</Layout>;
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

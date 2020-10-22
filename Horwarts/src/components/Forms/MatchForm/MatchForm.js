import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

import classes from './MatchForm.module.css';
import * as actions from '../../../store/actions';
import LayoutScroll from '../../UI/Layouts/LayoutScroll/LayoutScroll';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';

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
    date: moment(),
    focused: false
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
    this.setState({ date: date });
  };

  addMatchHandler = (event) => {
    event.preventDefault();
    const match = {
      team1: {
        house: this.state.form.team1.value,
        score: null
      },
      team2: {
        house: this.state.form.team2.value,
        score: null
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
        <form className={classes.MatchForm}>
          <h1>Add a new match</h1>
          <SingleDatePicker
            date={this.state.date}
            onDateChange={(date) => this.dateChangedHandler(date)}
            focused={this.state.focused}
            onFocusChange={({ focused }) => this.setState({ focused })}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <section>
            <Input
              elementType='select'
              value={this.state.form.team1.name.value}
              options={this.props.houses}
              changed={(event) =>
                this.inputChangedHandler(event, 'team1', 'name')
              }
            />
            <h1>VS</h1>
            <Input
              elementType='select'
              value={this.state.form.team2.name.value}
              options={this.props.houses}
              changed={(event) =>
                this.inputChangedHandler(event, 'team2', 'name')
              }
            />
          </section>
          <Button name='Add' />
        </form>
      );
      // form = (
      //   <form className={classes.MatchForm} onSubmit={this.addMatchHandler}>
      //     <h1>Add new match</h1>
      //     {formElements.map((el) => (
      //       <div key={el.id}>
      //         <select
      //           value={this.state.form[el.id].name.value}
      //           onChange={(event) =>
      //             this.inputChangedHandler(event, el.id, 'name')
      //           }
      //         >
      //           {this.props.houses.map((house) => (
      //             <option key={house.name} value={house._id}>
      //               {house.name}
      //             </option>
      //           ))}
      //         </select>
      //         <input
      //           type='number'
      //           value={this.state.form[el.id].score.value}
      //           onChange={(event) =>
      //             this.inputChangedHandler(event, el.id, 'score')
      //           }
      //         />
      //       </div>
      //     ))}
      //
      //   </form>
      //);
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

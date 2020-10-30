import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Moment from 'moment';

import classes from './QuidditchList.module.css';
import * as actions from '../../../store/actions';
import LayoutScroll from '../../UI/Layouts/LayoutScroll/LayoutScroll';
import Spinner from '../../UI/Spinner/Spinner';

class QuidditchList extends Component {
  componentDidMount() {
    this.props.onFetchMatches();
  }

  storeMatchesHandler = () => {
    localStorage.setItem('matches', JSON.stringify(this.props.matches));
  };

  render() {
    let table = <Spinner />;
    if (!this.props.loading) {
      table = (
        <table>
          <tbody>
            {this.props.matches.map((el) => (
              <tr key={el._id}>
                <td>{el.team1.house.name + ' - ' + el.team2.house.name}</td>
                <td>{Moment(el.date).format('DD-MM-YYYY')}</td>
                <td>
                  <NavLink
                    to={this.props.match.path + '/' + el._id}
                    key='edit'
                    onClick={this.storeMatchesHandler}
                  >
                    EDIT
                  </NavLink>
                </td>
                <td onClick={() => this.props.onDeleteMatch(el._id)}>DELETE</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return (
      <LayoutScroll>
        <div className={classes.QuidditchList}>
          <h1>List of matches</h1>
          {table}
        </div>
      </LayoutScroll>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    matches: state.quidditch.matches,
    loading: state.quidditch.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMatches: () => dispatch(actions.fetchMatches()),
    onDeleteMatch: (id) => dispatch(actions.deleteMatch(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuidditchList);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';

import classes from './Quidditch.module.css';
import * as actions from '../../store/actions/';
import Layout from '../../components/UI/Layouts/Layout/Layout';
import Match from '../../components/Match/Match';
import Spinner from '../../components/UI/Spinner/Spinner';

class Quidditch extends Component {
  componentDidMount() {
    this.props.onFetchMatches();
  }

  addMatchHanlder = () => {
    this.props.history.push('/quidditch/add-match');
  };

  render() {
    let matches = <Spinner />;
    if (!this.props.loading) {
      matches = this.props.matches.map((match) => (
        <Match
          key={match._id}
          team1={match.team1.house.name}
          team2={match.team2.house.name}
          date={Moment(match.date).format('DD-MM-YYYY')}
        />
      ));
    }
    return (
      <Layout>
        <div className={classes.Quidditch}>
          <h1> Quidditch matches</h1>
          {matches}
        </div>
      </Layout>
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
    onFetchMatches: () => dispatch(actions.fetchMatches())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quidditch);

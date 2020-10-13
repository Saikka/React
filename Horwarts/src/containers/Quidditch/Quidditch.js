import React, { Component } from 'react';

import Layout from '../../components/UI/Layouts/Layout/Layout';
import Match from '../../components/Match/Match';
import classes from './Quidditch.module.css';

class Quidditch extends Component {
  render() {
    return (
      <Layout>
        <div className={classes.Quidditch}>
          <h1> Quidditch matches</h1>
          <Match />
        </div>
      </Layout>
    );
  }
}

export default Quidditch;

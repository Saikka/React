import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Info.module.css';
import LayoutScroll from '../UI/Layouts/LayoutScroll/LayoutScroll';

class Info extends Component {
  render() {
    console.log(this.props.user);
    return (
      <LayoutScroll>
        <div className={classes.Info}>
          <h1>Personal information</h1>
          <img
            src='https://pbs.twimg.com/profile_images/1073125872981311488/mtEikVtA.jpg'
            alt='portrate'
          />
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{this.props.user.teacher.firstname}</td>
              </tr>
              <tr>
                <td>Subject</td>
                <td>Potions</td>
              </tr>
              <tr>
                <td>Classroom</td>
                <td>342</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LayoutScroll>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Info);

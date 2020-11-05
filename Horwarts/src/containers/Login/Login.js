import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Login.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Layout from '../../components/UI/Layouts/Layout/Layout';

import * as actions from '../../store/actions';

class Login extends Component {
  loginHanlder = () => {
    this.props.onLogin('mcg.min.t', 'minmcg');
    //this.props.onLogin('admin', 'admin');
  };

  render() {
    let link;
    if (this.props.user) {
      if (this.props.user.teacher) {
        link = '/teacher/info';
      } else if (this.props.user.student) {
        link = '/teacher/info';
      } else {
        link = '/manage';
      }
    }
    return (
      <Layout>
        {this.props.user ? <Redirect to={link} /> : null}
        <div className={classes.Login}>
          <Input label='Name' type='text' elementType='input' />
          <Input label='Password' type='text' elementType='input' />
          <Button name='Login' clicked={this.loginHanlder} />
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (login, password) => dispatch(actions.login(login, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React, { Component } from 'react';

import classes from './Login.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Layout from '../../components/UI/Layouts/Layout/Layout';

class Login extends Component {
  loginHanlder = () => {
    this.props.history.push('/teacher/info');
  };

  render() {
    return (
      <Layout>
        <div className={classes.Login}>
          <Input label='Name' type='text' elementType='input' />
          <Input label='Password' type='text' elementType='input' />
          <Button name='Login' clicked={this.loginHanlder} />
        </div>
      </Layout>
    );
  }
}

export default Login;

import React, { Component } from 'react';

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
        <Input label='Name' />
        <Input label='Password' />
        <Button name='Login' clicked={this.loginHanlder} />
      </Layout>
    );
  }
}

export default Login;

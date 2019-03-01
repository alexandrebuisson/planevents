import React, { Component } from 'react';
import {
  Form, Icon, Input, Button
} from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { notifSuccess, notifError } from '../../actions/notifications';
import { setUser } from '../../actions/Auth';
import _ from 'lodash';
import Cookies from 'js-cookie';

import "./Login.css";

class Login extends Component {
constructor(props) {
  super(props);
  this.state = {
    mail: "",
    password: "",
  }
  this.handleChange = this.handleChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
}

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value, 
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      setUser, notifError, notifSuccess, history, location: { state },
    } = this.props;
    fetch("http://localhost:4000/api/signin", {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(this.state),
    })
      // eslint-disable-next-line consistent-return
      .then((res) => {
        if (res.status === 401) {
          notifError('Mauvais mot de passe ou adresse email');
        }
        if (res.status === 200) {
          notifSuccess('Connecté');
          return res.json();
        }
      })
      .then((data) => {
        if (!_.isEmpty(data)) {
          setUser(data.user, data.token);
          Cookies.set('token', data.token, { expires: 1 });
          const { activeTab, from } = state || { from: { pathname: '/app' } };
          history.push({
            pathname: from.pathname,
            state: { activeTab },
          });
        }
      });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { mail, password } = this.state;
    
    return (
      <div className="login-background">
        <div className="login-body">
          <Form onSubmit={this.onSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Merci de renseigner votre email !' }],
              })(
                <div>
                  <h2 className="login-title">Bienvenue sur PlanEvents</h2>
                  <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" name="mail" value={mail} onChange={this.handleChange} placeholder="Email" />
                </div>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Merci de renseigner votre mot de passe !' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" name="password" value={password} onChange={this.handleChange} placeholder="Mot de passe" />
              )}
            </Form.Item>
            <Form.Item>
              <a className="login-form-forgot" href="/reset-password">Mot de passe oublié ?</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Connexion
              </Button>
              <Link className="login-register" to="/register">S'inscrire !</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mdtp = dispatch => bindActionCreators({ setUser, notifSuccess, notifError }, dispatch);

export default connect(null, mdtp)(Form.create()(Login))

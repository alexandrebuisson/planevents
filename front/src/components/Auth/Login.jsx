import React, { Component } from 'react'
import {
  Form, Icon, Input, Button
} from 'antd';
import { Link } from 'react-router-dom'
import "./Login.css"

class Login extends Component {
constructor(props) {
  super(props);
  this.state = {
    name: "",
    mail: "",
    password: "",
    confirm_password: "",
  }
  this.handleChange = this.handleChange.bind(this);
}

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value, 
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { name, mail, password, confirm_password } = this.state;
    console.log(name);
    
    return (
      <div className="login-body">
        <Form onSubmit={this.onSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Merci de renseigner votre Nom !' }],
            })(
              <div>
                <h2 className="login-title">Bienvenue sur PlanEvents</h2>
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} name="name" value={name} onChange={this.handleChange} placeholder="Nom" />
              </div>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Merci de renseigner votre mot de passe !' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Mot de passe" />
            )}
          </Form.Item>
          <Form.Item>
            <a className="login-form-forgot" href="/reinitialisation">Mot de passe oublié ?</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Connexion
            </Button>
            <Link className="login-register" to="/inscription">S'inscrire !</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login)

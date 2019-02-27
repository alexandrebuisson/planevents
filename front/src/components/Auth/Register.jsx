import React, { Component } from 'react'
import {
  Form, Icon, Input, Button
} from 'antd';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { notifSuccess, notifError } from '../../actions/notifications';
import { NotificationManager } from 'react-notifications';
import "./Register.css"

class Register extends Component {
constructor(props) {
  super(props);
  this.state = {
    name: "",
    mail: "",
    password: "",
    confirm_password: "",
  }
  this.handleChange = this.handleChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
  this.confirmInput = React.createRef();

}
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onSubmit(e) {
    const { name, mail, password, confirm_password } = this.state;
    const { notifError, notifSuccess, history } = this.props;
    e.preventDefault();
    if(password !== confirm_password) {
      notifError("Les mots de passe sont invalide !");
      this.confirmInput.current.focus();
    } else {
      fetch("http://localhost:4000/api/signup", {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(this.state),
      })
      .then((res) => {
        if (res.status === 500) {
          notifError('Adresse email déjà enregistré');
        }
        if (res.status === 200) {
          notifSuccess('Compte enregistré, vous pouvez vous connecter');
          history.push("/");
        }
      });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { name, mail, password, confirm_password } = this.state;
    
    return (
      <div className="register-body">
        <Form onSubmit={this.onSubmit} className="register-form">
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Merci de renseigner votre Nom !' }],
            })(
              <div>
                <h2 className="register-title">Bienvenue sur PlanEvents</h2>
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} required name="name" value={name} onChange={this.handleChange} placeholder="Nom" />
              </div>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('mail', {
              rules: [{ required: true, message: 'Merci de renseigner votre email !' }],
            })(
              <div>
                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} required name="mail" value={mail} onChange={this.handleChange} type="email" placeholder="Mail" />
              </div>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Merci de renseigner votre mot de passe !' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} minLength="8" required name="password" value={password} onChange={this.handleChange} type="password" placeholder="Mot de passe" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('confirm_password', {
              rules: [{ required: true, message: 'Merci de renseigner la confirmation de mot de passe !' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} ref={this.confirmInput} minLength="8" required name="confirm_password" value={confirm_password} onChange={this.handleChange} type="password" placeholder="Confirmation du mot de passe" />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="register-form-button">
              Inscription
            </Button>
            <Link className="login-register" to="/">Déja un compte ?</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mdtp = dispatch => bindActionCreators({ notifSuccess, notifError }, dispatch);

export default connect(null, mdtp)(Form.create()(Register));

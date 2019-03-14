import React, { Component } from 'react';
import {
  Layout, Menu, Icon, Modal, Input, Card, Button
} from 'antd';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { notifError, notifSuccess } from '../../actions/notifications';
import Cookies from 'js-cookie';
import { logout } from '../../actions/Auth';
import "./MyAccount.css";

const {
  Content, Footer, Sider,
} = Layout;


class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      collapsed: false,
     }
  }
  render() {
    const { mail } = this.props;
    const { collapsed } = this.state;
    return ( 
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
        >
          <Menu theme="dark" defaultSelectedKeys={['3']} mode="inline">
            <Menu.Item key="1">
              <Icon type="calendar" />
              <span><Link to="/app" className="links">Mes évènements</Link></span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="usergroup-add" />
              <span><Link to="/join" className="links">Rejoindre vos amis</Link></span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="user" />
              <span><Link to="/my-account" className="links">Mon compte</Link></span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="logout" />
              <span onClick={this.logout}>Déconnexion</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            Bienvenue {mail}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <img alt="app logo" className="logo" src="/medias/app-logo.png" /> © 2019 Created by Alexsouye
          </Footer>
        </Layout>
      </Layout>
     );
  }
}

const mstp = state => ({
  user: state.authReducer.user.name,
  mail: state.authReducer.user.mail,
  date: state.authReducer.user.createdAt,
});

const mdtp = dispatch => bindActionCreators({ logout, notifError, notifSuccess }, dispatch);
 
export default connect(mstp, mdtp)(MyAccount);

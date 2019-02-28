import React, { Component } from 'react';
import {
  Layout, Menu, Button, Icon,
} from 'antd';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import "./HomePage.css";

const {
  Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      collapsed: false,
     }
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }


  render() {
    const { user, mail, date } = this.props;
    const { collapsed } = this.state;

    return ( 
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
        >
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="calendar" />
              <span to="/app">Mes évènements</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="usergroup-add" />
              <span to="/join">Rejoindre vos amis</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="user" />
              <span to="/app/my-account">Mon compte</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <div className="float">
            <Icon className="my-float" type="plus" />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <img className="logo" src="/medias/app-logo.png" /> ©2019 Created by Alexsouye
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
 
export default connect(mstp)(HomePage);
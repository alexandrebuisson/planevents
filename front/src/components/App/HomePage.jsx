import React, { Component } from 'react';
import {
  Layout, Menu, Button, Icon, Modal, Input, Select, InputNumber,
} from 'antd';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import "./HomePage.css";

const {
  Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;
const { Option } = Select;


class HomePage extends Component {
  constructor(props) {
    super(props);
    const { mail } = this.props;    
    this.state = { 
      collapsed: false,
      visible: false,
      mail: {mail},
      event_name: "Création d'un event",
      event_category: "",
      nb_guests: 2,
    }
    this.onChange = this.onChange.bind(this);
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  handleOpen = () => {
    this.setState({
      visible: true,
    })
  }

  handleClose = () => {
    this.setState({
      visible: false,
    });
  }

  createEvent = () => {
    
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }


  render() {
    const { user, mail, date } = this.props;
    const { collapsed, visible, event_name, event_category, nb_guests } = this.state;

    return ( 
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
        >
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="calendar" className="links"/>
              <span><Link to="/app" className="links">Mes évènements</Link></span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon className="links" type="usergroup-add" />
              <span><Link to="/join" className="links">Rejoindre vos amis</Link></span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="user" className="links" />
              <span><Link to="my-account" className="links">Mon compte</Link></span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <h1 style={{ textAlign: 'center' }}>Vos évènements</h1>
            <div onClick={this.handleOpen} className="float create-event">
            <Icon className="my-float" type="plus" />
            </div>
          </Content>
           <Modal
              title={event_name}
              visible={visible}
              onOk={this.createEvent}
              onCancel={this.handleClose}
            >
            <Input name="event_name" value={event_name} onChange={this.onChange} placeholder="Nom de l'évènement" />
            <Input name="event_category" value={event_category} onChange={this.onChange} placeholder="Catégorie, soirée" />
            <Input name="nb_guests" value={nb_guests} onChange={this.onChange} />
           </Modal>
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
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
import Chance from "chance";


import "./HomePage.css";

const {
  Content, Footer, Sider,
} = Layout;


class HomePage extends Component {
  constructor(props) {
    super(props);
    const { mail } = this.props;    
    this.state = { 
      collapsed: false,
      visible: false,
      mail,
      event_name: "",
      event_category: "",
      nb_guests: 2,
      data_events: []
    }
    this.onChange = this.onChange.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const { mail } = this.props;
    fetch(`http://localhost:4000/api/get-events/${mail}`)
      .then(results => results.json())
      .then(data => this.setState({ data_events: data }));
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

  createEvent = (e) => {
    e.preventDefault();
    const {
      mail, notifError
    } = this.props;
    fetch(`http://localhost:4000/api/create-event/${mail}`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(this.state),
    })
      // eslint-disable-next-line consistent-return
      .then((res) => {
        if (res.status === 500) {
          notifError('Erreur lors de la création...');
        }
        if (res.status === 200) {
          fetch(`http://localhost:4000/api/get-events/${mail}`)
            .then(results => results.json())
            .then(data => this.setState({ data_events: data, visible: false }));
        }
      })
  }

  deleteEvent(id) {
    const { mail, notifError } = this.props;

    fetch(`http://localhost:4000/api/delete-event/${id}/${mail}`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) {
        window.location.reload();
      } else {
        notifError("Erreur lors de la suppression")
      }
    });
  }

  logout() {
    const { logout, notifSuccess } = this.props;
    logout();
    Cookies.remove('token');
    notifSuccess('Vous avez été déconnecté');
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }


  render() {
    const { collapsed, visible, event_name, event_category, nb_guests, data_events } = this.state;

    const chance = new Chance();
    const my_random_string = chance.string();
    console.log(my_random_string);
    
  
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
            <h1 style={{ textAlign: 'center' }}>Vos évènements</h1>
            <div onClick={this.handleOpen} className="float create-event">
              <Icon className="my-float" type="plus" />
            </div>
            {
              data_events.map(item => (
                <div style={{ display: "flex" }}>
                  <Card title={item.event_name} bordered={false} style={{ width: 300 }}>
                    <p>{item.event_category}</p>
                    <p>{item.nb_guests}</p>
                    <Button shape="circle" icon="arrows-alt" />
                    <Button onClick={() => this.deleteEvent(item.id)} shape="circle" type="danger" icon="delete" />
                  </Card>
                </div> 
              ))
            }
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

 
export default connect(mstp, mdtp)(HomePage);
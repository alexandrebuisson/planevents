import React, { Component } from 'react';
import { NotificationContainer } from 'react-notifications';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

class App extends Component {
  render() {
    return (
      <div className="login-background">
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/inscription" component={Register}/>
        </Switch>
        <NotificationContainer />
      </div>
    );
  }
}

export default App;

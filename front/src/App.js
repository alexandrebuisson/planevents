import React, { Component } from 'react';
import { NotificationContainer } from 'react-notifications';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import HomePage from './components/App/HomePage';
import PrivateRoute from './PrivateRoute';

class App extends Component {
  render() {
    return (
      <div className="login-background">
        <Switch>
          { /* Public routes */ }
          <Route exact path="/" component={Login}/>
          <Route path="/register" component={Register}/>
          
          { /* Private routes, only for registered users */ }
          <PrivateRoute path="/app" component={HomePage} />
        </Switch>
        <NotificationContainer />
      </div>
    );
  }
}

export default App;

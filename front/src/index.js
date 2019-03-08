import React from 'react';
import ReactDOM from 'react-dom';
import allReducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import CheckToken from './CheckToken';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import 'react-notifications/lib/notifications.css'; 

const store = createStore(allReducers, applyMiddleware(thunk));


ReactDOM.render(
  <Provider store={store}>
    <CheckToken>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CheckToken>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

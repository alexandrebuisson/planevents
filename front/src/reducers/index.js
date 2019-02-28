import { combineReducers } from 'redux';
import notificationsReducer from './notificationsReducer';
import authReducer from './authReducer';

const allReducers = combineReducers({
  notificationsReducer,
  authReducer,
});

export default allReducers;
 
import { combineReducers } from 'redux';
import notificationsReducer from './notificationsReducer';

const allReducers = combineReducers({
  notificationsReducer,
});

export default allReducers;
 
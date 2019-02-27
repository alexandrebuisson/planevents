import { NotificationManager } from 'react-notifications';

const initialState = '';

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIF_SUCCESS':
      NotificationManager.success(action.message, '', 3500);
      return null;
    case 'NOTIF_ERROR':
      NotificationManager.error(action.message, '', 3500);
      return null;
    case 'NOTIF_INFO':
      NotificationManager.info(action.message, '', 3500);
      return null;
    case 'INIT_STATE':
      return initialState;

    default:
      return state;
  }
};

export default notificationsReducer;
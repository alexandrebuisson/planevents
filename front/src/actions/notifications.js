export const notifSuccess = message => ({
  type: 'NOTIF_SUCCESS',
  message,
});

export const notifError = message => ({
  type: 'NOTIF_ERROR',
  message,
});

export const notifInfo = message => ({
  type: 'NOTIF_INFO',
  message,
});
const initialState = {
  user: {},
  token: '',
};

const log = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        user: { ...action.user },
        token: action.token,
      };
    case 'LOGOUT':
      return { ...initialState };
    default:
      return state;
  }
};

export default log;
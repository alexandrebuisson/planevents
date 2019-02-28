export const setUser = (user, token) => ({
  type: 'SET_USER',
  user,
  token,
});

export const logout = () => ({
  type: 'LOGOUT',
});
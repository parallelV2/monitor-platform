const TOKEN_KEY = 'token';
const ID_KEY = 'userID';

const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const getLocalID = () => {
  return Number(localStorage.getItem(ID_KEY));
};

const setLocalID = (id: number) => {
  localStorage.setItem(ID_KEY, `${id}`);
};

const clearLocalID = () => {
  localStorage.removeItem(ID_KEY);
};

export {
  isLogin,
  getToken,
  setToken,
  clearToken,
  getLocalID,
  setLocalID,
  clearLocalID,
};

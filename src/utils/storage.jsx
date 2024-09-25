



const STORAGE_TOKEN = 'token';
const STORAGE_LOGGED = 'logged'

export const saveAccessToken = (token) => {
  localStorage.setItem(STORAGE_TOKEN, token);
}

export const setLoginState = (state) => {
  localStorage.setItem(STORAGE_LOGGED, state);
}

export const loginState = localStorage.getItem(STORAGE_LOGGED);
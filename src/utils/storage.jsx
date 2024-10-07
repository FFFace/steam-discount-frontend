import cookie from 'react-cookies'




const STORAGE_ACCESS_TOKEN = 'token';
const STORAGE_LOGGED = 'logged';
const STORAGE_REFRESH_TOKEN = 'refreshToken'

export const saveAccessToken = (token) => {
  localStorage.setItem(STORAGE_ACCESS_TOKEN, token);
}

export const removeAccessToken = () => {
  localStorage.removeItem(STORAGE_ACCESS_TOKEN);
}

export const removeRefreshToken = () => {
  cookie.remove(STORAGE_REFRESH_TOKEN);
}
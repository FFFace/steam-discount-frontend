



const STORAGE_TOKEN = 'token';

export const saveAccessToken = (token) => {
  localStorage.setItem(STORAGE_TOKEN, token);
}

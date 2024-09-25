import { atom } from "recoil";

export const userState = atom({
  key: 'userState',
  default: {
    isLoggedIn: !!localStorage.getItem('token') 
  }
})
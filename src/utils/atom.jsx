import { atom } from "recoil";

export const userState = atom({
  key: 'userState',
  default: {
    isLoggedIn: true,
    nickname: null,
    role: null
  }
})

export const test = atom({
  key: 'test',
  default: {
    isLoggedIn: true
  }
})

export const boardState = atom({
  key: 'boardState',
  default: {
    boardList: null
  }
})
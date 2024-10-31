import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './component/Header';
import DiscountList from './pages/discountList/DiscountList';
import Login from './pages/user/Login';
import { createTheme, ThemeProvider } from '@mui/material';
import UserRegister from './pages/user/UserRegister';
import EmailValidation from './pages/user/EmailValidation';
import { RecoilRoot } from 'recoil';
import Post from './pages/post/Post';
import WritePost from './pages/post/WritePost';
import Main from './pages/main/Main';
import Board from './pages/board/Board';
import MyPage from './pages/user/MyPage';
import WritedPostList from './pages/user/WritedPostList';
import AdminPage from './pages/admin/AdminPage';
import UserManager from './pages/admin/UserManager';

const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans KR", "Roboto","Helvetica","Arial",sans-serif'
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/discount-list" element={<DiscountList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/email-validation" element={<EmailValidation />} />
          <Route path="/board" element={<Board />} />
          <Route path="/post" element={<Post />} />
          <Route path="/write-post" element={<WritePost />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/writed-post-list" element={<WritedPostList />} />
          <Route path='/admin-page' element={<AdminPage/>}/>
          <Route path='/user-info' element={<UserManager/>}/>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

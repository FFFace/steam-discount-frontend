import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './component/Header';
import DiscountList from './pages/discountList/DiscountList';
import Login from './pages/user/Login'
import { createTheme, ThemeProvider } from '@mui/material';
import UserRegister from './pages/user/UserRegister';
import EmailValidation from './pages/user/EmailValidation';
import { RecoilRoot } from 'recoil';
import Post from './pages/post/Post';
import WritePost from './pages/post/WritePost';
import PostList from './pages/post/PostList';
import Main from './pages/main/Main';
import Board from './pages/board/Board';
import MyPage from './pages/user/MyPage';
import WritedPostList from './pages/user/WritedPostList';

const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans KR", "Roboto","Helvetica","Arial",sans-serif'
  }
})

const bodyRouter = createBrowserRouter([
  {
    path: '/',
    element: <Main/>
  },
  {
    path: '/discount-list',
    element: <DiscountList/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/user-register',
    element: <UserRegister/>
  },
  {
    path: '/email-validation',
    element: <EmailValidation/>
  },
  {
    path: '/board',
    element: <Board/>
  },
  {
    path: '/post-list',
    element: <PostList/>
  },
  {
    path: '/post',
    element: <Post/>
  },
  {
    path: '/write-post',
    element: <WritePost/>
  },
  {
    path: '/my-page',
    element: <MyPage/>
  },
  {
    path: '/writed-post-list',
    element: <WritedPostList/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <RecoilRoot>
      <RouterProvider router={bodyRouter}>
      </RouterProvider>
    </RecoilRoot>    
  </ThemeProvider>  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

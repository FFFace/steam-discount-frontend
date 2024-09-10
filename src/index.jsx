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

const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans KR", "Roboto","Helvetica","Arial",sans-serif'
  }
})

const bodyRouter = createBrowserRouter([
  {
    path: '/',
    element: <App/>
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
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={bodyRouter}/>
  </ThemeProvider>  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

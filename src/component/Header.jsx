import { Typography, Box, Container, Button } from '@mui/material';
import {CustomButton} from './ui/button/CustomButton';
import { useNavigate } from 'react-router-dom';
import { setLoginState, loginState, logout } from '../utils/storage';
import { useEffect, useState } from 'react';
import CustomTypography from './ui/typography/CustomTypography';

const Header = () =>{

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const onClickDiscountList = () =>{
    navigate('/discount-list');
  }

  const onClickLogin = () => {
    navigate('/login');
  }

  const onClickLogout = () => {
    setIsLogin(false);
  }

  useEffect(() => {
    setIsLogin(loginState);
    console.log(isLogin, loginState);
  }, [loginState]);

  useEffect(() => {
    if(!isLogin)
      setLoginState(false);
  }, [isLogin])

  const LoginButton = () => {
    return (
      <Box sx={{float:'right'}}>
        <CustomButton onClick={onClickLogin}>
          로그인
        </CustomButton>
      </Box>
    );
  }

  const LogoutButton = () => {
    return (
      <Box sx={{float:'right'}}>
        <CustomButton onClick={onClickLogout}>
          로그아웃
        </CustomButton>
      </Box>
    )
  }

  return(
    <Box sx={{display: 'block', margin: '30px 0px 30px 0px'}}>
      <Box sx={{backgroundColor: 'var(--color2)',}}>
        <CustomButton onClick={onClickDiscountList}>
          할인 목록
        </CustomButton>
        <CustomButton>
          공지사항
        </CustomButton>
        <CustomButton>
          커뮤니티
        </CustomButton>
        {isLogin ? <LogoutButton/> : <LoginButton/>}
      </Box>  
    </Box>
  )
}

export default Header;
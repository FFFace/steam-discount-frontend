import { Typography, Box, Container, Button } from '@mui/material';
import {CustomButton} from './ui/button/CustomButton';
import { useNavigate } from 'react-router-dom';
import { setLoginState, loginState, saveAccessToken, saveLogged, removeAccessToken, removeRefreshToken } from '../utils/storage';
import { useEffect, useState } from 'react';
import CustomTypography from './ui/typography/CustomTypography';
import { useRecoilState } from 'recoil';
import { boardState, userState } from '../utils/atom';
import { axiosInstance } from '../utils/axios';
import Loading from './ui/loading/Loading';
import { CustomDialog } from './ui/dialog/CustomDialog';

const Header = () =>{

  const navigate = useNavigate();
  
  const [recoilState, setRecoilState] = useRecoilState(userState);
  const [boardList, setBoardList] = useRecoilState(boardState);

  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    const pageOpen = async () => {
      try{
        await axiosInstance.get(`/token-check`);

        setRecoilState({
          ...recoilState,
          isLoggedIn: true
        })

      } catch(exception){

        setRecoilState({
          ...recoilState,
          isLoggedIn: false
        })

        removeAccessToken();
        removeRefreshToken();
      }
    }

    const getBoardList = async () => {
      try{
        const response = await axiosInstance.get(`/boards`);

        setBoardList({
          boardList: response.data
        });

      } catch(exception){
        console.log(exception);
      }
    }

    if(recoilState.isLoggedIn)
      pageOpen();

    if(!boardList.boardList)
      getBoardList();      
  }, []);

  const onClickDiscountList = () =>{
    navigate('/discount-list');
  }

  const onClickLogin = () => {
    navigate('/login');
  }

  const onClickLogout = async () => {
    setLoading(true);
    try{
      await axiosInstance.post(`/logout`);

    } catch(exception){
      console.log(exception);
    }

    setRecoilState({
      ...recoilState,
      isLoggedIn: false
    })

    setLoading(false);
  }

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

  const onClickMainButton = () => {
    navigate('/');
  }

  const onClickNoticeButton = () => {
    navigate('/notice');
  }

  const onClickPostButton = () => {

  }

  return(
    <Box sx={{display: 'block', margin: '30px 0px 30px 0px'}}>
      <Box sx={{backgroundColor: 'var(--color2)',}}>
        <CustomButton onClick={onClickMainButton}>
          메인
        </CustomButton>
        <CustomButton onClick={onClickDiscountList}>
          할인 목록
        </CustomButton>
        <CustomButton onClick={onClickNoticeButton}>
          공지사항
        </CustomButton>
        <CustomButton onClick={onClickPostButton}>
          게시판
        </CustomButton>
        {recoilState.isLoggedIn ? <LogoutButton/> : <LoginButton/>}
      </Box>  
      <Loading open={loading}/>
    </Box>
  )
}

export default Header;
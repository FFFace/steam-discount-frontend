import { Typography, Box, Container, Button } from '@mui/material';
import {CustomButton} from './ui/button/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { setLoginState, loginState, saveAccessToken, saveLogged, removeAccessToken, removeRefreshToken } from '../utils/storage';
import { useEffect, useState } from 'react';
import CustomTypography from './ui/typography/CustomTypography';
import { useRecoilState } from 'recoil';
import { boardState, userState } from '../utils/atom';
import { axiosInstance } from '../utils/axios';
import Loading from './ui/loading/Loading';
import { CustomDialog, CustomDialogContent, CustomDialogTitle } from './ui/dialog/CustomDialog';

const Header = () =>{

  const navigate = useNavigate();
  
  const [recoilState, setRecoilState] = useRecoilState(userState);
  const [boardList, setBoardList] = useRecoilState(boardState);

  const [loading, setLoading] = useState(false);
  const [openBoardList, setOpenBoardList] = useState(false);

  const getBoardList = async () => {
    setLoading(true);

    try{
      const response = await axiosInstance.get(`/boards`);
      response.data.shift();
      setBoardList({
        boardList: response.data
      });

    } catch(exception){
      console.log(exception);
    }

    setLoading(false);
  }

  useEffect(() =>{
    const pageOpen = async () => {
      try{
        const response = await axiosInstance.get(`/token-check`);

        setRecoilState({
          ...recoilState,
          isLoggedIn: true,
          nickname: response.data.nickname,
          role: response.data.role 
        })

        console.log(response);

      } catch(exception){

        setRecoilState({
          ...recoilState,
          isLoggedIn: false,
          nickname: null,
          role: null
        })

        removeAccessToken();
        removeRefreshToken();
      }
    }

    if(recoilState.isLoggedIn)
      pageOpen(); 
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
    navigate('/board', {
      state: {
        board: {
          id: 1,
          name: '공지사항'
        }
      }
    });
  }

  const onClickBoardListButton = () => {
    if(!boardList.boardList)
    getBoardList();
    setOpenBoardList(true);
  }

  const onClickBoardButton = (e, id, name) => {
    e.preventDefault();

    navigate(`/board`, {
      state: {
        board: {
          id: id,
          name: name
        }
      }
    })

    setOpenBoardList(false);
  }

  const BoardListComponent = () => { 
    return boardList.boardList.map(board =>(
      <Box key={board.id} sx={{padding: '5px', borderBottomStyle: 'solid', borderWidth: '1px'}}>
        <Link onClick={(e) => onClickBoardButton(e, board.id, board.name)}>
          <CustomTypography sx={{display: 'inline-block', width: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
            {board.name}
          </CustomTypography>
        </Link>
      </Box>      
    ));
  }

  const onCloseBoardDialog = () => {
    setOpenBoardList(false);
  }

  const BoardDialogComponent = () => {
    return(
      <CustomDialog open={openBoardList} onClose={onCloseBoardDialog}>
        <CustomDialogTitle>게시판 목록</CustomDialogTitle>
        <CustomDialogContent>
          {boardList.boardList ? <BoardListComponent/> : null}
        </CustomDialogContent>
      </CustomDialog>
    )
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
        <CustomButton onClick={onClickBoardListButton}>
          게시판
        </CustomButton>
        {recoilState.isLoggedIn ? <LogoutButton/> : <LoginButton/>}
      </Box>
      {boardList.boardList ? <BoardDialogComponent/> : null}
      <Loading open={loading}/>
    </Box>
  )
}

export default Header;
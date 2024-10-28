import { Typography, Box, Container, Button, Menu, MenuItem } from '@mui/material';
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

  const LoginButton = () => {
    return (
      <Box sx={{float:'right'}}>
        <CustomButton onClick={onClickLogin}>
          로그인
        </CustomButton>
      </Box>
    );
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

  const BoardList = () => { 
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

  const BoardDialog = () => {
    return(
      <CustomDialog open={openBoardList} onClose={onCloseBoardDialog}>
        <CustomDialogTitle>게시판 목록</CustomDialogTitle>
        <CustomDialogContent>
          {boardList.boardList ? <BoardList/> : null}
        </CustomDialogContent>
      </CustomDialog>
    )
  }

  const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
      setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

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

    const onClickMyPage = () => {
      navigate('/my-page');
    }

    return(
      <Box sx={{display: 'inline-block', float: 'right'}}>
        <CustomButton id='user-info-button' onClick={handleClick}>
          <CustomTypography sx={{textTransform: 'initial'}}>
            {recoilState.nickname}
          </CustomTypography>
        </CustomButton>

        <Menu open={open} anchorEl={anchorEl} onClose={handleClose} MenuListProps={{'aria-labelledby': 'user-info-button'}} sx={{"& .MuiMenu-paper": {backgroundColor: 'var(--color1)'}}}>
          <MenuItem sx={{color: 'var(--color4)'}} onClick={onClickMyPage}>마이페이지</MenuItem>
          <MenuItem sx={{color: 'var(--color4)'}} onClick={onClickLogout}>로그아웃</MenuItem>
        </Menu>
      </Box>

    )
  }

  return(
    <Box sx={{margin: '30px 0px 30px 0px'}}>
      <Box sx={{backgroundColor: 'var(--color2)'}}>
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
        {recoilState.isLoggedIn ? <UserMenu/> : <LoginButton/>}
      </Box>
      {boardList.boardList ? <BoardDialog/> : null}
      <Loading open={loading}/>
    </Box>
  )
}

export default Header;
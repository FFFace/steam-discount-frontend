import React, { useEffect, useState } from "react";
import Contents from "../../component/Contents";
import { Box } from "@mui/material";
import { axiosInstance } from '../../utils/axios';
import CustomTypography from '../../component/ui/typography/CustomTypography'
import styled from "styled-components";
import { CustomBox } from "../../component/ui/box/CustomBox";
import Loading from "../../component/ui/loading/Loading";
import { CustomButton } from "../../component/ui/button/CustomButton";
import { useNavigate } from "react-router-dom";
import { CustomDialogError, CustomDialogWarning } from "../../component/ui/dialog/CustomDialog";
import { ColorizeSharp } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import { userState } from "../../utils/atom";



const Link = styled.a`
  color: var(--color2)
`

const DiscountList = () => {

  const [recoilState, setRecoilState] = useRecoilState(userState);
  const [discountList, setDiscountList] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [warningInfo, setWarningInfo] = useState({
    open: false,
    title: null,
    content: null,
    dialogActionAccept: null,
    dialogActionCancel: null
  });

  const [errorInfo, setErrorInfo] = useState({
    open: false,
    title: null,
    content: null,
    dialogAction: null
  }) 

  const [alarmInfo, setAlarmInfo] = useState({
    open: false,
    title: null,
    content: null,
    dialogAction: null
  });

  const onClickGoBoard = async (boardName) => {
    setLoading(true);

    try{
      const response = await axiosInstance.get(`/boards/${boardName}`);

      const boardId = response.data.id;

      navigate('/board', {
        state: {
          board: {
            id: boardId,
            name: boardName
          }
        }
      });
    } catch(exception){

      if(exception.response.status === 400){

        const dialogAccept = async () => {

          if(!recoilState.isLoggedIn){

            const dialogClose  = () => {
              setErrorInfo({open:false});
              setWarningInfo({open:false});
            }

            setErrorInfo({
              open: true,
              title: '권한 없음',
              content: '로그인이 필요한 작업입니다.\n로그인 후 다시 이용해 주세요.',
              dialogAction: dialogClose
            });

            return;
          }

          try{
            await axiosInstance.post(`/boards`, {
              boardName: boardName
            });

            setAlarmInfo({
              open: true,
              title: '게시판 생성 완료',
              content: '게시판 생성에 성공했습니다.\n해당 게시판으로 이동합니다',
              dialogAction: onClickGoBoard(boardName)
            });
          } catch(exception){
            console.log(exception);
          }
        }

        setWarningInfo({
          open: true,
          title: '게시판 없음',
          content: '해당 게시판이 존재하지 않습니다.\n해당 게시판을 새로 만드시겠습니까?',
          dialogActionAccept: dialogAccept
        })
      }

      console.log(exception);
    }

    setLoading(false);
  }

  const DiscountList = () =>{    
    return discountList.map(discount =>(
      <Box key={discount.id}>
        <CustomBox>
          <Box sx={{float: 'right'}}>
            <CustomButton onClick={(e) => onClickGoBoard(discount.name)}>
              게시판으로 이동
            </CustomButton>            
          </Box>
          <Link href={discount.link} target='_blank'>
            <CustomTypography sx={{margin: '0px 0px 19px 0px', width: '50%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>{discount.name}</CustomTypography>
            <img src={discount.image}></img>
          </Link>
          <Box sx={{float: 'right'}}>
            <CustomTypography color='gray' sx={{display: 'inline', textDecoration: 'line-through'}}>{discount.originPrice}</CustomTypography>
            <CustomTypography>{discount.discountPrice}</CustomTypography>
          </Box>        
          <Box sx={{margin: '5px 20px 0px', float: 'right'}}>
            <CustomTypography color='#81F680' sx={{padding: '0px 5px 0px 5px', fontSize: '25px', backgroundColor: '#4A610A'}}>{discount.discountPercent}</CustomTypography>
          </Box>
        </CustomBox>
      </Box>

    ));
  }

  useEffect(()=>{
    setLoading(true);
    const getDiscountList = async () =>{
      try{
        const response = await axiosInstance.get('/discount-list');
        setDiscountList(response.data);
      } catch (exception){
        console.log(exception);
      }

      setLoading(false);
    }
    getDiscountList();
  }, []);

  const onClickUpdateDiscountList = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    try{
      await axiosInstance.get('/new-discount');
      window.location.reload();
    } catch(exception){
      console.log(exception);
    }
    
    setLoading(false);
  }

  return(
    <Contents>
      <CustomBox>
        <Box sx={{padding: '10px'}}>
          <Box sx={{display: 'inline-block'}}>
            <CustomTypography variant='h5'>
              스팀 할인 목록 100
            </CustomTypography>
          </Box>

          {recoilState.role === 'ADMIN' ? 
            <Box sx={{display: 'inline-block', float: 'right'}}>
            <CustomButton onClick={onClickUpdateDiscountList}>
              최신화
            </CustomButton>
          </Box> : null}

        </Box>
      </CustomBox>
      {discountList ? <DiscountList/> : <></>}
      <CustomDialogWarning open={warningInfo.open} title={warningInfo.title} content={warningInfo.content} dialogActionAccept={warningInfo.dialogActionAccept} dialogActionCancle={() => {
        setWarningInfo({
          ...warningInfo,
          open: false
        })
      }}/>

      <CustomDialogError open={errorInfo.open} title={errorInfo.title} content={errorInfo.content} dialogAction={errorInfo.dialogAction}/>
      <Loading open={loading} />
    </Contents>
  );
};

export default DiscountList;
import { useEffect, useState } from "react"
import Contants from "../../component/Contants"
import { CustomBox } from "../../component/ui/box/CustomBox"
import CustomTypography from "../../component/ui/typography/CustomTypography"
import { useLocation } from "react-router-dom"
import { Box, Button, DialogActions, IconButton } from "@mui/material"
import { axiosInstance } from "../../utils/axios"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAlt from "@mui/icons-material/ThumbDownAlt"
import Loading from "../../component/ui/loading/Loading"
import { useRecoilState } from "recoil"
import { userState } from "../../utils/atom"
import { CustomDialog, CustomDialogContent, CustomDialogErrorTitle, CustomDialogTitle } from "../../component/ui/dialog/CustomDialog"
import { CustomButton } from "../../component/ui/button/CustomButton"



const Post = () => {

  const location = useLocation();
  const postInfo = location.state?.post;

  const [postDetailInfo, setPostDetailInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);

  const [recoilState, setRecoilState] = useRecoilState(userState);

  useEffect(()=>{
    setLoading(true);
    const getContent = async () => {
      
      try{
        const response = (await axiosInstance.get(`/posts/${postInfo.id}`)).data;
        setPostDetailInfo(response);
        console.log(response);
      } catch(exception){
        console.log(exception);
      }

      setLoading(false);
    }
    getContent();
  }, [])

  const PostContentComponent = () => {
    return(
      <Box sx={{padding: '10px'}}>
        <CustomTypography>
          {postDetailInfo.content}
        </CustomTypography>
      </Box>
    )
  }

  const PostThumbsComponent = () => {
    return(
      <Box sx={{margin: '50px 0px 0px 0px',padding: '10px', textAlign: 'center'}}>
        <IconButton sx={{margin: '0px 5px 0px 0px'}} onClick={onClickThumbsUpButton}>
          <ThumbUpAltIcon fontSize='large' sx={{color: 'white'}}/>
        </IconButton>
        <CustomTypography sx={{display: 'inline-block'}}>
          {postDetailInfo.thumbsUp}
        </CustomTypography>

        <IconButton sx={{margin: '0px 5px 0px 40px'}} onClick={OnClickThumbsDownButton}>
          <ThumbDownAlt fontSize='large' sx={{color: 'white'}}/>
        </IconButton>
        <CustomTypography sx={{display: 'inline-block'}}>
          {postDetailInfo.thumbsDown}
        </CustomTypography>
      </Box>
    )
  }

  const onClickThumbsUpButton = () => {
    if(isLoggedInForThumbsButton())
      return;
  }

  const OnClickThumbsDownButton = () => {
    if(isLoggedInForThumbsButton())
      return;


  }

  const isLoggedInForThumbsButton = () => {
    setDialog(!recoilState.isLoggedIn);
    return dialog;
  }

  const DialogError = () => {
    return(
      <CustomDialog open={dialog}>
        <CustomDialogErrorTitle>
          사용할 수 없습니다.
        </CustomDialogErrorTitle>
        <CustomDialogContent>
          로그인 한 사용자만 이용할 수 있습니다.<br/>
          로그인 후 다시 이용해 주세요.
        </CustomDialogContent>
        <DialogActions>
          <CustomButton onClick={onClickDialogErrorAccept}>
            확인
          </CustomButton>
        </DialogActions>
      </CustomDialog>
    )
  }

  const onClickDialogErrorAccept = () => {
    setDialog(false);
  }

  return(
    <Contants>
      <CustomBox>
        <CustomTypography variant='h5' sx={{padding: '10px'}}>
          {postInfo.name}
        </CustomTypography>
        <Box>
          <CustomTypography sx={{display: 'inline-block', padding: '0px 0px 10px 10px'}}>
            작성자: {postInfo.writer}
          </CustomTypography>
          <CustomTypography sx={{display: 'inline-block', padding: '0px 10px 10px 0px', float: 'right'}}>
            작성일: 9999.99.99
          </CustomTypography>
        </Box>        
      </CustomBox>

      <CustomBox>
        {postDetailInfo ? <PostContentComponent/> : null}
        {postDetailInfo ? <PostThumbsComponent/> : null}
      </CustomBox>
      <DialogError/>
      <Loading open={loading}/>
    </Contants>
  )
}


export default Post;
import { useEffect, useState } from "react"
import Contents from "../../component/Contents"
import { CustomBox } from "../../component/ui/box/CustomBox"
import CustomTypography from "../../component/ui/typography/CustomTypography"
import { useLocation, useSearchParams } from "react-router-dom"
import { Box, Button, DialogActions, IconButton } from "@mui/material"
import { axiosInstance } from "../../utils/axios"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAlt from "@mui/icons-material/ThumbDownAlt"
import Loading from "../../component/ui/loading/Loading"
import { useRecoilState } from "recoil"
import { userState } from "../../utils/atom"
import { CustomDialog, CustomDialogContent, CustomDialogErrorTitle, CustomDialogTitle } from "../../component/ui/dialog/CustomDialog"
import { CustomButton, CustomButtonWhite } from "../../component/ui/button/CustomButton"
import { Viewer } from "@toast-ui/react-editor"
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { CustomTextField } from "../../component/ui/textField/CustomTextField"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { isMobile } from "react-device-detect"

const Post = () => {

  const location = useLocation();
  // const postInfo = location.state?.post;
  const [postInfo, setPostInfo] = useSearchParams();

  const [postDetailInfo, setPostDetailInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [comment, setComment] = useState({
    parentId: null,
    contents: null
  });

  const [recoilState, setRecoilState] = useRecoilState(userState);

  useEffect(()=>{
    setLoading(true);
    const getContent = async () => {
      
      try{
        const response = (await axiosInstance.get(`/posts/${postInfo.get('id')}`)).data;
        setPostDetailInfo(response);

      } catch(exception){

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

  const ToastPostContentComponent = () => {
    return(
      <Box sx={{padding: '10px'}}>
        <Viewer initialValue={postDetailInfo.content} theme='dark'/>
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
    if(isLoggedInForThumbsButton()){
      return;
    }
      
  
    reqeustThumbs('thumbs-up')
  }

  const OnClickThumbsDownButton = () => {
    if(isLoggedInForThumbsButton())
      return;

    reqeustThumbs('thumbs-down ');
  }

  const isLoggedInForThumbsButton = () => {
    setDialog(!recoilState.isLoggedIn);
    return !recoilState.isLoggedIn;
  }

  /** 
   * 게시글 추천 또는 비추천 요청 함수 입니다.
   * @param {string} thumbs thumbs-up 또는 thumbs-down 
   */
  const reqeustThumbs = async (thumbs) => {
    setLoading(true);
    try{
      const response = await axiosInstance.post(`posts/${postInfo.get('id')}/${thumbs}`);

      setPostDetailInfo({
        ...postDetailInfo,
        thumbsUp: response.data.thumbsUp,
        thumbsDown: response.data.thumbsDown
      });

    } catch(exception){
      console.log(exception);
    }

    setLoading(false);
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

  const MoreHorizComponent = () => {
    return (
      <IconButton>
        <MoreHorizIcon fontSize="large" sx={{color: 'var(--color4)'}}/>
      </IconButton>
    )
  }

  const onChangeComment = (e) => {
    setComment({
      ...comment,
      [e.target.name]: [e.target.value]
    });

    console.log(comment);
  }

  const onClickCreateComment = async () => {
    try{
      await axiosInstance.post(`/posts/comment`, {
        postId: postInfo.get('id'),
        parentId: null,
        content: null
      });

    } catch(exception){
      console.log(exception);
    }
  }

  const MoreCommentComponent = () => {
    return (
      <Box sx={{margin: '20px 0px 0px 0px', display: 'flex', textAlign: 'center', justifyContent: 'center', border: 'double 6px var(--color1)'}}>
        <CustomButton fullWidth>
          댓글 더 보기
        </CustomButton>
      </Box>
    )
  }

  return(
    <Contents>
      <CustomBox>
        <Box sx={{padding: '10px'}}>
          <CustomTypography variant='h5'>
            {postInfo.get('board-name')}
          </CustomTypography>
        </Box>
      </CustomBox>
      <CustomBox>
        <CustomTypography sx={{padding: '10px', fontSize: 'larger', display: 'inline-block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
          {postInfo.get('name')}
        </CustomTypography>
        <Box sx={{float: 'right'}}>
          {isMobile && postInfo.get('writer') ? <MoreHorizComponent/> : null}
        </Box>
        <Box>
          <CustomTypography sx={{display: 'inline-block', padding: '0px 0px 10px 10px'}}>
            작성자: {postInfo.get('writer')}
          </CustomTypography>
          <CustomTypography sx={{display: 'inline-block', padding: '0px 10px 10px 0px', float: 'right'}}>
            작성일: {postDetailInfo ? postDetailInfo.createdAt : null}
          </CustomTypography>
        </Box>        
      </CustomBox>

      <CustomBox>
        {postDetailInfo ? <ToastPostContentComponent/> : null}
        {postDetailInfo ? <PostThumbsComponent/> : null}
        
      </CustomBox>

      <CustomBox>
        <Box sx={{padding: '10px'}}>
          <CustomTypography variant='h5' sx={{display: 'inline-block'}}>
            전체 댓글
          </CustomTypography>
          <CustomTypography sx={{margin: '0px 0px 0px 5px', display: 'inline-block'}}>
            (99개)
          </CustomTypography>          
        </Box>

        <Box sx={{margin: '10px 0px', padding: '10px 0px', borderTopStyle: 'solid', borderBottomStyle: 'solid', borderWidth: '3px', borderColor: 'var(--color1)'}}>
          <MoreCommentComponent/>
        </Box>
          

        <Box >
          <CustomTextField name='contents' onChange={onChangeComment} multiline placeholder='여기서 댓글을 달아주세요.'/>

          <Box sx={{margin: '-10px 0px 0px', display: 'flex', textAlign: 'center', justifyContent: 'right'}}>
            <Box>
              <CustomButton onClick={onClickCreateComment}>댓글 등록</CustomButton>
            </Box>
          </Box>
        </Box>
      </CustomBox>
      <DialogError/>
      <Loading open={loading}/>
    </Contents>
  )
}


export default Post;
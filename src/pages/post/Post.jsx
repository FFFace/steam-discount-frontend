import { useCallback, useEffect, useRef, useState } from "react"
import Contents from "../../component/Contents"
import { CustomBox } from "../../component/ui/box/CustomBox"
import CustomTypography from "../../component/ui/typography/CustomTypography"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { Box, Button, DialogActions, IconButton, Menu, MenuItem, TextField } from "@mui/material"
import { axiosInstance } from "../../utils/axios"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAlt from "@mui/icons-material/ThumbDownAlt"
import Loading from "../../component/ui/loading/Loading"
import { useRecoilState } from "recoil"
import { userState } from "../../utils/atom"
import { CustomDialog, CustomDialogContent, CustomDialogErrorTitle, CustomDialogTitle, CustomDialogError } from "../../component/ui/dialog/CustomDialog"
import { CustomButton, CustomButtonWhite } from "../../component/ui/button/CustomButton"
import { Viewer } from "@toast-ui/react-editor"
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { CustomTextField, CustomTextFieldComment, CustomTextFieldComment1, CustomTextFieldComment2, CustomTextFieldComment3 } from "../../component/ui/textField/CustomTextField"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { isMobile } from "react-device-detect"
import { BorderColor, Close, Delete, Save } from "@mui/icons-material"

const pcState = {
  nicknameWidth: '20%',
  contentWidth: '60%',
  dateWidth: '20%',
  moreReply: '42%'
}

const mobileState = {
  nicknameWidth: '20%',
  contentWidth: '80%',
  dateWidth: '0',
  moreReply: '66%'
}

const deviceState = isMobile ? mobileState : pcState;

const Post = () => {
  const [postInfo, setPostInfo] = useSearchParams();

  const [postDetailInfo, setPostDetailInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState({
    open: false,
    title: null,
    content: null
  });
  
  const [commentInfo, setCommentInfo] = useState(null);

  const [recoilState, setRecoilState] = useRecoilState(userState);

  const commentRef = useRef();
  const navigate = useNavigate();
  
  const getCommentList = async (page) => {
    setLoading(true);
    try{
      const response = await axiosInstance.get(`/posts/comments`, {
        params: {
          postId: postInfo.get('id'),
          page: page
        }
      });

      let commentList = commentInfo?.commentList;
      commentList ? commentList.push(...response.data.commentResponseDTOList) : commentList=response.data.commentResponseDTOList;

      setCommentInfo({
        commentList: commentList,
        currentPage: page,
        totalPage: response.data.totalPage,
        totalElement: response.data.totalElement
      })

    } catch(exception){
      console.log(exception);
    }

    setLoading(false);
  }

  useEffect(()=>{
    setLoading(true);
    const getPost = async () => {
      try{
        const response = await axiosInstance.get(`/posts/${postInfo.get('id')}`);
        setPostDetailInfo(response.data);

      } catch(exception){

      }
    }

    getPost();

    setCommentInfo({
      currentPage: 0
    });

    getCommentList(0);
  }, [])

  const ToastPostContent = () => {
    return(
      <Box sx={{padding: '10px'}}>
        <Viewer initialValue={postDetailInfo.content} theme='dark'/>
      </Box>      
    )
  }

  const PostThumbs = () => {
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
    setErrorInfo({
      ...errorInfo,
      open: !recoilState.isLoggedIn,
      title: '권한 없음',
      content: '로그인이 필요한 기능입니다.\n로그인 후 다시 이용해 주세요.'
    });

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

  const MoreHoriz = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
      setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const onClickPostUpdate = () => {
      navigate('/write-post', {
        state: {
          board: {
            name: postInfo.get('board-name')
          },
          postInfo: {
            id: postInfo.get('id'),
            name: postInfo.get('name'),
            content: postDetailInfo.content
          }
        }
      })
    }

    return (
      <>
        <IconButton id='menu-button' aria-controls={open ? 'menu-button' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
          <MoreHorizIcon fontSize="large" sx={{color: 'var(--color4)'}}/>
        </IconButton>
        <Menu open={open} anchorEl={anchorEl} onClose={handleClose} MenuListProps={{'aria-labelledby': 'menu-button'}} sx={{"& .MuiMenu-paper": {backgroundColor: 'var(--color1)'}}}>
          <MenuItem sx={{color: 'var(--color4)'}} onClick={onClickPostUpdate}>수정</MenuItem>
          <MenuItem sx={{color: 'var(--color4)'}}>삭제</MenuItem>
        </Menu>
      </>
    )
  }

  const onClickMoreComment = (e) => {
    e.preventDefault();
    
    const page = commentInfo?.currentPage + 1;
    getCommentList(page);
  }

  const MoreComment = () => {
    return (
      <Box sx={{margin: '20px 0px 0px 0px', display: 'flex', textAlign: 'center', justifyContent: 'center', border: 'double 6px var(--color1)'}}>
        <CustomButton fullWidth onClick={onClickMoreComment}>댓글 더 보기</CustomButton>
      </Box>
    );
  }

  const CustomTextFieldCommentUpdateDepth0 = ({...props}) => {
    return (
      <TextField size="small" multiline sx={{
        width: deviceState.contentWidth,
        margin: '5px 0px 10px 0px',
        display: 'flex',
        ' .MuiOutlinedInput-root': {
          color: 'white',
          border: 'solid 1px var(--color1)',
          backgroundColor: 'var(--color1)',
          '&.Mui-focused fieldset': {
            border: 'solid 2px gray'
          }
        }
      }} 
      {...props} />
    );
  };

  const CustomTextFieldCommentUpdateDepth1 = ({...props}) => {
    return (
      <TextField size="small" multiline sx={{
        width: deviceState.contentWidth,
        margin: '5px 0px 10px 0px',
        display: 'flex',
        ' .MuiOutlinedInput-root': {
          color: 'white',
          border: 'solid 1px var(--color2)',
          backgroundColor: 'var(--color2)',
          '&.Mui-focused fieldset': {
            border: 'solid 2px gray'
          }
        }
      }} 
      {...props} />
    );
  };

  const Comment = ({comment, parentId, depth}) => {

    const [updated, setUpdated] = useState(false);

    const onClickUpdateIconButton = (e) => {
      e.preventDefault();
      setUpdated(!updated);
    }

    const UpdateDeleteIcon = () => {
      return (
        <>
          {updated ? 
            <IconButton sx={{float: 'left'}}>
              <Save fontSize="small" sx={{color: 'var(--color4)'}}/>
            </IconButton> 
            :
            <IconButton onClick={onClickUpdateIconButton} sx={{float: 'left'}}>
              <BorderColor fontSize="small" sx={{color: 'var(--color4)'}}/>
            </IconButton>}
          
          {updated ? 
            <IconButton onClick={onClickUpdateIconButton} sx={{float: 'left'}}>
              <Close fontSize="small" sx={{color: 'var(--color4)'}}/>
            </IconButton>
            :
            <IconButton sx={{float: 'left'}}>
              <Delete fontSize="small" sx={{color: 'var(--color4)'}}/>
            </IconButton>}          
        </>
      )
    }

    const BoxingContent = () => {
      return (
        <>
          <Box sx={{display: 'flex'}}>
            <CustomTypography sx={{width: deviceState.nicknameWidth, display: 'inline-block', alignContent: 'center'}}>
              {comment.writer}
            </CustomTypography>

            {updated && depth === 1 ? <CustomTextFieldCommentUpdateDepth0 defaultValue={comment.content}/> :
              updated && depth === 2 ? <CustomTextFieldCommentUpdateDepth1 defaultValue={comment.content}/> :
              <CustomTypography sx={{width: deviceState.contentWidth, display: 'inline-block', whiteSpace: 'pre-line'}}>
                {comment.content}
              </CustomTypography>}

            {isMobile ? null : 
              <CustomTypography sx={{width: deviceState.dateWidth, display: 'inline-block', textAlign: 'right', alignContent: 'center'}}>
                {comment.createdAt}
              </CustomTypography>}
          </Box>

          <Box sx={{margin: '8px 0px -5px 0px'}}>
            {(recoilState.nickname === comment.writer) || (!isMobile && recoilState.role==='ADMIN') ? <UpdateDeleteIcon/> : null}
            <CommentBottom comment={comment} parentId={parentId ? parentId : comment.id} depth={depth}/>
          </Box>
        </>
      )
    }

    return (
      <>
        {depth === 1 ? 
          <Box key={comment.id} sx={{margin: '0px 0px 8px 0px', padding: '0px 0px 8px 0px', borderBottomStyle: 'solid', borderWidth: '2px', borderColor: 'var(--color1)'}}>
            <BoxingContent/>
          </Box>
          :
          <Box key={comment.id} sx={{margin: '8px 0px 0px 0px', padding: '8px 8px 8px 50px', borderTopStyle: 'solid', borderWidth: '2px', borderColor: 'var(--color1)', backgroundColor: 'var(--color1)'}}>
            <BoxingContent/>  
          </Box>}
      </>
    )
  }

  const CommentList = ({commentList, parentId, depth}) => {

    if(!commentList){
      return commentInfo.commentList.map(comment => (
        <Comment key={comment.id} comment={comment} depth={depth}/>
      ))
    } else{
      return commentList.map(comment => (
        <Comment key={comment.id} comment={comment} parentId={parentId} depth={depth}/>
      ));
    }
  }

  const CommentBottom = ({comment, parentId, depth}) => {
    const [display, setDisplay] = useState(false);
    const [reply, setReply] = useState(null);
    const [replyDisplay, setReplyDisplay] = useState(false);
    const onClickCommendButton = (e) => {
      e.preventDefault();
      setDisplay(!display)
    };

    const onClickMoreReplyButton = async () => {
      try{
        const response = await axiosInstance.get('/posts/comments/reply', {
          params: {
            parentId: parentId,
            page: reply?.currentPage+1
          }
        })

        let replyList = reply?.replyList;
        replyList.push(...response.data.commentResponseDTOList);
        const currentPage = reply?.currentPage+1;
        setReply({
          ...reply,
          replyList: replyList,
          currentPage: currentPage
        });
      } catch(exception){ 
        console.log(exception);
      }
    };

    useEffect(() => {
      setReply({
        replyList: comment?.replyCommentPageResponseDTO?.commentResponseDTOList,
        currentPage: 0,
        totalPage: comment?.replyCommentPageResponseDTO?.totalPage
      });
    }, []);

    return (
      <> 
        {display ? <CommentTextField parentId={parentId} depth={depth} defaultValue={`@${comment.writer} `} /> : null}
        
        <Box sx={{textAlign: 'right'}}>
          <Box sx={{display: 'inline-block'}}>
            {reply?.replyList?.length > 0 && !replyDisplay ?
            <CustomButton onClick={()=>setReplyDisplay(!replyDisplay)}>
              답글 펼치기
            </CustomButton> : reply?.replyList?.length > 0 && replyDisplay ? 
            <CustomButton onClick={() => setReplyDisplay(!replyDisplay)}>
              답글 접기
            </CustomButton> : null}
            
            {display ? <CustomButton onClick={(e) => onClickCommendButton(e)}>취소</CustomButton> :
              <CustomButton onClick={(e) => onClickCommendButton(e)}>답글</CustomButton>}            

          </Box>
        </Box>        
        {replyDisplay ? <CommentList commentList={reply?.replyList} parentId={comment.id} depth={2} /> : null}
        {replyDisplay &&  reply?.currentPage+1 < reply?.totalPage ? 
        <Box sx={{margin: '10px 0px 10px 0px', display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
          <CustomButton onClick={onClickMoreReplyButton}>
            답글 더 보기
          </CustomButton>
        </Box> : null}
      </>

    )
  }

  const CommentTextField = ({parentId, depth, defaultValue}) => {
    const onClickCreateComment = async () => {

      if(commentRef.current?.value.length <= 0){
        setErrorInfo({
          open: true,
          title: '요청 실패',
          content: '공백은 댓글로 등록할 수 없습니다.\n댓글 내용을 확인해 주세요'
        })
        return;
      }

      setLoading(true);
      try{
          const response = await axiosInstance.post(`/posts/comments`, {
            postId: postInfo.get('id'),
            parentId: parentId,
            content: commentRef.current?.value
          });

          let commentList = commentInfo?.commentList;
          commentList.push(response.data);
          setCommentInfo({
            ...commentInfo,
            commentList: commentList
          });

      } catch(exception){
        console.log(exception);
      }

      setLoading(false);
    }

    const CommentInputFieldDepth0 = ({disable}) => {
      return(
        <>
          {disable ? <CustomTextFieldComment1 key='content' name='content' inputRef={commentRef} multiline placeholder='여기서 댓글을 달아주세요.' defaultValue={defaultValue}/> :
            <CustomTextFieldComment1 disabled key='content' name='content' inputRef={commentRef} multiline placeholder='여기서 댓글을 달아주세요.' defaultValue={defaultValue}/> }
        </>        
      )
    }

    const CommentInputFieldDepth1 = ({disable}) => {
      return(
        <>
          {disable ? <CustomTextFieldComment2 key='content' name='content' inputRef={commentRef} multiline placeholder='여기서 댓글을 달아주세요.' defaultValue={defaultValue}/> :
            <CustomTextFieldComment2 disabled key='content' name='content' inputRef={commentRef} multiline placeholder='여기서 댓글을 달아주세요.' defaultValue={defaultValue}/> }
        </>        
      )
    }

    const CommentInputFieldDepth2 = ({disable}) => {
      return(
        <>
          {disable ? <CustomTextFieldComment3 key='content' name='content' inputRef={commentRef} multiline placeholder='여기서 댓글을 달아주세요.' defaultValue={defaultValue}/> :
            <CustomTextFieldComment3 disabled key='content' name='content' inputRef={commentRef} multiline placeholder='여기서 댓글을 달아주세요.' defaultValue={defaultValue}/> }
        </>        
      )
    }

    return(
      <Box >
        {depth == 0 ? <CommentInputFieldDepth0 disable={recoilState.isLoggedIn}/> :
          depth == 1 ? <CommentInputFieldDepth1 disable={recoilState.isLoggedIn}/> :
            <CommentInputFieldDepth2 disable={recoilState.isLoggedIn}/>}        

        <Box sx={{margin: '-10px 0px 0px', display: 'flex', textAlign: 'center', justifyContent: 'right'}}>
          <Box>
            {!recoilState.isLoggedIn ? 
              <CustomButton disabled>댓글 등록</CustomButton> :
              <CustomButton onClick={onClickCreateComment}>댓글 등록</CustomButton>}
            
          </Box>
        </Box>
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
          {(!isMobile && postInfo.get('writer') === recoilState.nickname) || (!isMobile && recoilState.role==='ADMIN') ? <MoreHoriz/> : null}
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
        {postDetailInfo ? <ToastPostContent/> : null}
        {postDetailInfo ? <PostThumbs/> : null}
        
      </CustomBox>

      <CustomBox>
        <Box sx={{padding: '10px'}}>
          <CustomTypography variant='h5' sx={{display: 'inline-block'}}>
            전체 댓글
          </CustomTypography>
          <CustomTypography sx={{margin: '0px 0px 0px 5px', display: 'inline-block'}}>
            ({commentInfo ? commentInfo?.totalElement : null })
          </CustomTypography>          
        </Box>

        <Box sx={{margin: '10px 0px', padding: '10px 0px', borderTopStyle: 'solid', borderBottomStyle: 'solid', borderWidth: '3px', borderColor: 'var(--color1)'}}>
          <Box sx={{padding: '0px 10px 0px 10px'}}>
            {commentInfo?.commentList ? <CommentList depth={1}/> : null}
          </Box>
          {commentInfo?.totalPage > commentInfo?.currentPage+1 ? <MoreComment/> : null}
        </Box>
        
        <CommentTextField depth={0}/>
      </CustomBox>
      <CustomDialogError open={errorInfo.open} title={errorInfo.title} content={errorInfo.content} dialogAction={() => 
        setErrorInfo({
          ...errorInfo,
          open: false
        })}/>
      <Loading open={loading}/>
    </Contents>
  )
}


export default Post;
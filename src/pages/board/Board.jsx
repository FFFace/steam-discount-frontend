import { Box, Button } from "@mui/material";
import Contents from "../../component/Contents";
import { CustomBox } from "../../component/ui/box/CustomBox";
import CustomTypography from "../../component/ui/typography/CustomTypography";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../component/ui/loading/Loading";
import { CustomButton } from "../../component/ui/button/CustomButton";
import { useRecoilState } from "recoil";
import { userState } from "../../utils/atom";
import { CustomDialogAlarm, CustomDialogError } from "../../component/ui/dialog/CustomDialog";


const NOTICE_BOARD_NUMBER = 1;

const Board = () => {

  const [totalPage, setTotalPage] = useState(0);
  const [postInfo, setPostInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openLoginError, setOpenLoginError] = useState(false);
  const [errorInfo, setErrorInfo] = useState({
    open: false,
    title: null,
    content: null
  })
  const [alarmInfo, setAlarmInfo] = useState({
    open: false,
    title: null,
    content: null
  })

  const location = useLocation();
  const board = location.state?.board;
  const [recoilState, setRecoilState] = useRecoilState(userState);

  const navigate = useNavigate();

  const getPostList = async (page) => {
    setLoading(true);
    try{
      const response = await axiosInstance.get(`/posts`, {
        params:{
          boardId: board.id,
          page: page
        }
      });
      
      let postList = postInfo?.postList;
      !postList || page === 0 ? postList = response.data.postPageResponseDTOList : postList.push(...response.data.postPageResponseDTOList);

      setPostInfo({
        postList: postList,
        totalPage: response.data.totalPage,
        currentPage: page
      });

    } catch(exception){
      console.log(exception);
    }
    setLoading(false);
  }

  useEffect(() => {
    setPostInfo(null);

    getPostList(0);
  }, [board]);

  const PostListTypographyTitle = ({children}) => {
    return (
      <CustomTypography sx={{margin: '0px 0px 0px 5px', display: 'inline-block', width: '60%', textAlign: 'left', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
        {children}
      </CustomTypography>
    )
  }

  const PostListTypographyWriter = ({children}) => {
    return (
      <CustomTypography sx={{display: 'inline-block', width: '18%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
        {children}
      </CustomTypography>
    )    
  }

  const PostListTypographyThumbs = ({children}) => {
    return (
      <CustomTypography sx={{display: 'inline-block', width: '15%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', textAlign: 'center'}}>
        {children}
      </CustomTypography>
    )   
  }

  const onClickPost = async (e, post) => {
    setLoading(true);
    e.preventDefault();
    try{
      const response = await axiosInstance.get(`posts/disable/${post.id}`);

      if(response.data){
        window.open(`/post?board-name=${board?.name}&id=${post.id}&name=${post.name}&writer=${post.writer}`, '_blank', 'noopener,noreferrer');
      } else{
        setAlarmInfo({
          open: true,
          title: '삭제된 게시글',
          content: '해당 게시글은 삭제된 게시글입니다.'
        });

        const postList = postInfo.postList.filter(oldPost => oldPost.id !== post.id);
        setPostInfo({
          ...postInfo,
          postList: postList
        });
      }
    } catch(exception){
      console.log(exception);
    }

    setLoading(false);
  }

  const PostList = () =>{
    return postInfo.postList.map(post => (
        <Box key={post.id} sx={{borderBottomStyle: 'solid', borderWidth: '3px', borderColor: 'var(--color1)'}}>
          {/* <Link onClick={(e)=>onClickNoticePost(e, post)}>
            <PostListTypographyTitle>{post.name}</PostListTypographyTitle>
          </Link> */}

          <Link onClick={(e) => onClickPost(e, post)}>
            <PostListTypographyTitle>{post.name}</PostListTypographyTitle>
          </Link>

          <PostListTypographyWriter>{post.writer}</PostListTypographyWriter>

          <PostListTypographyThumbs>{post.thumbsUp}</PostListTypographyThumbs>
        </Box>
    ));
  }

  const onClickWritePostButton = () => {

    if(!recoilState.isLoggedIn){
      setErrorInfo({
        open: true,
        title: '권한 없음',
        content: '로그인 후 사용할 수 있는 기능입니다.\n로그인 후 다시 이용해 주세요.'
      })
      return;
    }

    navigate('/write-post', {
      state: {
        board: {
         id: board.id,
         name: board.name 
        }
      }
    })
  }

  const MorePostList = () => {

    const onClickMorePost = (e) => {
      e.preventDefault();

      getPostList(postInfo.currentPage+1);
    }

    return(
      <Box sx={{margin: '20px 0px 0px 0px', display: 'flex', textAlign: 'center', justifyContent: 'center', border: 'double 6px var(--color1)'}}>
        <CustomButton fullWidth onClick={onClickMorePost}>
          댓글 더 보기
        </CustomButton>
      </Box>
    )
  }

  return(
    <Contents>
      <CustomBox>
        <Box sx={{padding: '10px'}}>
          <Button size='large' onClick={onClickWritePostButton} sx={{color: 'var(--color4)', float: 'right', ":hover": {background: 'var(--color2)'}}}>
            글쓰기
          </Button>
          <CustomTypography variant='h5'>
            {board?.name}
          </CustomTypography>
        </Box>
      </CustomBox>
      <CustomBox>        
        <PostListTypographyTitle>제목</PostListTypographyTitle>
        <PostListTypographyWriter>작성자</PostListTypographyWriter>
        <PostListTypographyThumbs>추천수</PostListTypographyThumbs>
      </CustomBox>
        
      <CustomBox>
        {postInfo?.totalPage ? <PostList/> : <CustomTypography variant='h5' sx={{padding: '10px'}}>게시글이 존재하지 않습니다.</CustomTypography>}
        {postInfo?.totalPage > postInfo?.currentPage + 1 ? <MorePostList/> : null}
      </CustomBox>

      <Loading open={loading}/>
      <CustomDialogError open={errorInfo.open} title={errorInfo.title} content={errorInfo.content} dialogAction={() => setErrorInfo({
        ...errorInfo,
        open: false
      })}/>
      <CustomDialogAlarm open={alarmInfo.open} title={alarmInfo.title} content={alarmInfo.content} dialogAction={() => setAlarmInfo({
        ...alarmInfo,
        open: false
      })}/>
    </Contents>
  )
}

export default Board;
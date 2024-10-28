import { Padding } from "@mui/icons-material"
import Contents from "../../component/Contents"
import { CustomBox } from "../../component/ui/box/CustomBox"
import CustomTypography from "../../component/ui/typography/CustomTypography"
import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { axiosInstance } from "../../utils/axios"
import { Link, useNavigate } from "react-router-dom"
import { PostListTypographyThumbs, PostListTypographyTitle, PostListTypographyWriter } from "../board/Board"
import Loading from "../../component/ui/loading/Loading"
import { CustomDialogError } from "../../component/ui/dialog/CustomDialog"
import { CustomButton } from "../../component/ui/button/CustomButton"



const WritedPostList = () => {

  const [postInfo, setPostInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState({
    open: false,
    title: null,
    content: null,
    dialogAction: null
  });

  const navigate = useNavigate();

  const getWritedPost = async (page) => {
    setLoading(true);

    try{
      const response = await axiosInstance.get('/posts/writed-post-list', {
        params: {
          page: page
        }
      });

      let postList = postInfo?.postList;
      if(postList){
        postList.push(...response.data.postPageResponseDTOList);
      } else{
        postList = response.data.postPageResponseDTOList;
      }

      setPostInfo({
        ...postInfo,
        postList: postList,
        totalPage: response.data.totalPage,
        currentPage: page 
      });

    } catch(exception){
      setErrorInfo({
        open: true,
        title: '에러',
        content: '게시글을 불러오는데 실패했습니다.\n이전 페이지로 돌아갑니다.',
        dialogAction: window.location.reload()
      })
    }

    setLoading(false);
  }

  useEffect(()=>{
    getWritedPost(0);
  }, []);


  const PostList = () => {
    const onClickPost = (e, post) => {
      e.preventDefault();

      try{
        window.open(`/post?board-name=${post.boardName}&id=${post.id}&name=${post.name}&writer=${post.writer}`, '_blank', 'noopener,noreferrer');
      } catch(exception){
        console.log(exception);
      }
    }

    return postInfo?.postList.map(post => (
      <Box key={post.id} sx={{borderBottomStyle: 'solid', borderWidth: '3px', borderColor: 'var(--color1)'}}>
      <Link onClick={(e) => onClickPost(e, post)}>
        <PostListTypographyTitle>{post.name}</PostListTypographyTitle>
      </Link>

      <PostListTypographyWriter>{post.boardName}</PostListTypographyWriter>

      <PostListTypographyThumbs>{post.thumbsUp}</PostListTypographyThumbs>
    </Box>
    ));
  }

  const MorePostList = () => {

    const onClickMorePost = (e) => {
      e.preventDefault();

      getWritedPost(postInfo.currentPage+1);
    }

    return(
      <Box sx={{margin: '20px 0px 0px 0px', display: 'flex', textAlign: 'center', justifyContent: 'center', border: 'double 6px var(--color1)'}}>
        <CustomButton fullWidth onClick={onClickMorePost}>
          게시글 더 보기
        </CustomButton>
      </Box>
    )
  }

  return(
    <Contents>
      <CustomBox>
        <Box sx={{padding: '10px'}}>
          <CustomTypography variant='h5'>내가 쓴 글</CustomTypography>
        </Box>
      </CustomBox>

      <CustomBox>        
        <PostListTypographyTitle>제목</PostListTypographyTitle>
        <PostListTypographyWriter>게시판</PostListTypographyWriter>
        <PostListTypographyThumbs>추천수</PostListTypographyThumbs>
      </CustomBox>

      <CustomBox>
        <PostList/>
        {postInfo?.totalPage > postInfo?.currentPage+1 ? <MorePostList/> : null}
      </CustomBox>

      <CustomDialogError open={errorInfo.open} title={errorInfo.title} content={errorInfo.content} dialogAction={errorInfo.dialogAction}/>
      <Loading open={loading}/>
    </Contents>
  )
}


export default WritedPostList;
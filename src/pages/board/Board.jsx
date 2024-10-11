import { Box, Button } from "@mui/material";
import Contents from "../../component/Contents";
import { CustomBox } from "../../component/ui/box/CustomBox";
import CustomTypography from "../../component/ui/typography/CustomTypography";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../component/ui/loading/Loading";
import { CustomButton } from "../../component/ui/button/CustomButton";


const NOTICE_BOARD_NUMBER = 1;

const Board = () => {

  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [postList, setPostList] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const board = location.state?.board;

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setPostList(null);
    const getNoticeList = async () => {
      try{
        const response = await axiosInstance.get(`/posts`, {
          params:{
            boardId: board.id,
            page: page
          }
        });
        
        setTotalPage(response.data.totalPage);
        setPostList(response.data.postPageResponseDTOList)
      } catch(exception){
        console.log(exception);
      }

      setLoading(false);
    }

    getNoticeList();
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

  const onClickPost = (e, post) => {
    e.preventDefault();
    window.open(`/post?board-name=${board?.name}&id=${post.id}&name=${post.name}&writer=${post.writer}`, '_blank', 'noopener,noreferrer');
  }

  const PostListComponent = () =>{
    return postList.map(post => (
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
    navigate('/write-post', {
      state: {
        board: {
         id: board.id,
         name: board.name 
        }
      }
    })
  }

  const onClickNoticePost = (e, post) => {
    e.preventDefault();

    navigate('/post', {state: {post: post}});
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
        {postList ? <PostListComponent/> : null}
      </CustomBox>

      <Loading open={loading}/>
    </Contents>
  )
}

export default Board;
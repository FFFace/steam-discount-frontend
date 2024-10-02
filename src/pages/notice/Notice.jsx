import { Box } from "@mui/material";
import Contants from "../../component/Contants";
import { CustomBox } from "../../component/ui/box/CustomBox";
import CustomTypography from "../../component/ui/typography/CustomTypography";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";


const NOTICE_BOARD_NUMBER = 1;

const Notice = () => {

  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [postList, setPostList] = useState(null);

  useEffect(() => {
    const getNoticeList = async () => {
      try{
        const response = await axiosInstance.get(`/posts`, {
          params:{
            boardId: NOTICE_BOARD_NUMBER,
            page: page
          }
        });
        
        setTotalPage(response.data.totalPage);
        setPostList(response.data.postPageResponseDTOList)

        console.log(response.data.postPageResponseDTOList);
      } catch(exception){
        console.log(exception);
      }
    }

    getNoticeList();
  }, []);

  const PostListTypographyTitle = ({children}) => {
    return (
      <CustomTypography sx={{margin: '0px 0px 0px 5px', display: 'inline-block', width: '70%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
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
      <CustomTypography sx={{display: 'inline-block', width: '10%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', textAlign: 'center'}}>
        {children}
      </CustomTypography>
    )   
  }

  const PostListComponent = () =>{
    return postList.map(post => (
      <Box sx={{borderBottomStyle: 'solid', borderTopStyle: 'solid', borderWidth: '1px'}}>
        <PostListTypographyTitle>{post.name}</PostListTypographyTitle>
        <PostListTypographyWriter>{post.writer}</PostListTypographyWriter>
        <PostListTypographyThumbs>{post.thumbsUp}</PostListTypographyThumbs>
      </Box>
    ));
  }

  console.log(postList);

  return(
    <Contants>
      <CustomBox>
        <Box sx={{padding: '10px'}}>
          <CustomTypography variant='h5'>
            공지사항
          </CustomTypography>
        </Box>
      </CustomBox>
      <CustomBox>
        <Box sx={{margin: '0px 0px 5px 0px', borderBottomStyle: 'solid', borderTopStyle: 'solid', borderWidth: '1px'}}>
          <PostListTypographyTitle>제목</PostListTypographyTitle>
          <PostListTypographyWriter>작성자</PostListTypographyWriter>
          <PostListTypographyThumbs>추천수</PostListTypographyThumbs>
        </Box>
        
        {postList ? <PostListComponent/> : <></>}
      </CustomBox>
    </Contants>
  )
}

export default Notice;
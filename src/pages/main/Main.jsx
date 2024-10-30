import { Box, Button, IconButton } from "@mui/material";
import Contents from "../../component/Contents"
import { CustomBox } from "../../component/ui/box/CustomBox";
import CustomTypography from "../../component/ui/typography/CustomTypography";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import Loading from "../../component/ui/loading/Loading";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import { CustomButton } from "../../component/ui/button/CustomButton";
import { ArrowRight } from "@mui/icons-material";
import { userState } from "../../utils/atom";
import { useRecoilState } from "recoil";
import { saveAccessToken } from "../../utils/storage";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CustomLink } from "../../component/ui/Link/CustomLink";
import { PostListTypographyThumbs, PostListTypographyTitle, PostListTypographyWriter } from "../board/Board";

const DISCOUNT_SAMPLE_MAX_COUNT = 4;

const Main = () => {

  const navigate = useNavigate();

  const [discountList, setDiscountList] = useState();
  const [loading, setLoading] = useState(false);
  const [itemNum, setItemNum] = useState(0);
  const [notice, setNotice] = useState(null);
  const [newPostList, setNewPostList] = useState(null);

  const [state, setState] = useRecoilState(userState);

  useEffect(() => {
    const getRandomDiscountFive = async () => {
      setLoading(true);
      try{
        const response = await axiosInstance.get(`/discount-five`);

        setDiscountList(response.data);

      } catch(exception){
        console.log(exception);
      }
    }

    const mainNotice = async () => {
      try{
        const response = await axiosInstance.get('/posts/main-notice');

        setNotice(response.data);
      } catch(exception){
        console.log(exception);
      }
    }

    const getNewPostList = async () => {
      try{
        const response = await axiosInstance.get('/posts/main-new-post-list');

        setNewPostList(response.data);

      } catch(exception){
        console.log(exception);
      }

      setLoading(false);
    }

    getRandomDiscountFive();
    mainNotice();
    getNewPostList();
  }, [])

  const onClickDiscountRightButton = () => {
    if(itemNum >= DISCOUNT_SAMPLE_MAX_COUNT){
      setItemNum(0);
    } else {
      setItemNum(itemNum+1);
    }
  }

  const onClickDiscountLeftButton = () => {
    if(itemNum <= 0){
      setItemNum(DISCOUNT_SAMPLE_MAX_COUNT);
    } else {
      setItemNum(itemNum-1);
    }
  }

  const onClickNewNotice = (e) => {
    e.preventDefault();
    window.open(`/post?board-name=공지사항&id=${notice.id}&name=${notice.name}&writer=${notice.writer}`, '_blank', 'noopener,noreferrer')
  }

  const Notice = () => {
    return(
      <Link href={`/post?board-name=공지사항&id=${notice.id}&name=${notice.name}&writer=${notice.writer}`} target="_blink" onClick={onClickNewNotice} style={{ textDecoration: 'none' }}>
        <CustomTypography>
          {notice.name}
        </CustomTypography>
      </Link>
    )
  }

  const NewPostList = () => {
    return newPostList.map(post => (
      <Box key={post.id} sx={{borderBottomStyle: 'solid', borderWidth: '3px', borderColor: 'var(--color1)', padding: '2px'}}>
        <Link onClick={(e) => onClickPost(e, post)}>
          <PostListTypographyTitle>{post.name}</PostListTypographyTitle>
        </Link>
        <PostListTypographyWriter>{post.boardName}</PostListTypographyWriter>
        <PostListTypographyThumbs>{post.thumbsUp}</PostListTypographyThumbs>
      </Box>
    ));
  }

  const onClickPost = async (e, post) => {
    setLoading(true);
    e.preventDefault();
    try{
      const response = await axiosInstance.get(`posts/disable/${post.id}`);

      if(response.data){
        window.open(`/post?board-name=${post.boardName}&id=${post.id}&name=${post.name}&writer=${post.writer}`, '_blank', 'noopener,noreferrer');
      } else{
        window.location.reload();
      }
    } catch(exception){
      console.log(exception);
    }

    setLoading(false);
  }

  const DiscountTitle = () => {
    return (
      <CustomLink href={discountList[itemNum].link} target='_blank'>
        <Box sx={{display: 'flex'}}>
          <Box sx={{display: 'flex', margin: 'auto'}}>
            <img src={discountList[itemNum].image}/>   
            <CustomTypography sx={{margin: '10px 0px 5px 10px', maxWidth: '15dvw', display: 'inline-block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
              {discountList[itemNum].name}
            </CustomTypography>    
          </Box>
        </Box>
      </CustomLink>      
    )
  }

  const DiscountPayload = () => {
    return (
      <Box sx={{display: 'flex', margin: '20px 0px'}}>
        <Box sx={{margin: 'auto'}}>
          <Box sx={{display: 'inline-block'}}>
            <CustomTypography color='#81F680' sx={{fontSize: '35px', backgroundColor: '#4A610A'}}>{discountList[itemNum].discountPercent}</CustomTypography>
          </Box>          
          <Box sx={{height: ' ', margin: '0px 0px 0px 20px', display: 'inline-block'}}> 
            <CustomTypography color='gray' sx={{textDecoration: 'line-through'}}>{discountList[itemNum].originPrice}</CustomTypography>
            <CustomTypography>{discountList[itemNum].discountPrice}</CustomTypography>
          </Box>          
        </Box>
      </Box>
    )
  }

  const onClickMoreDiscoutList = () => {
    navigate('/discount-list');
  }

  return(
    <Contents>
      <CustomBox>
        <CustomTypography variant='h5' sx={{padding: '10px'}}>
          최신 공지
        </CustomTypography>
      </CustomBox>

      <CustomBox>
        <Box sx={{borderBottomStyle: 'solid', borderWidth: '3px', borderColor: 'var(--color1)', padding: '0px 0px 0px 10px'}}>
          <Box sx={{padding: '5px'}}>
            {notice ? <Notice/> : null}
          </Box>
        </Box>
      </CustomBox>

      <CustomBox>
        <CustomTypography variant='h5' sx={{padding: '10px'}}>
          지금 할인 중!
        </CustomTypography>

        <Box sx={{borderTopStyle: 'solid', borderBottomStyle: 'solid', borderWidth: '3px', borderColor: 'var(--color1)'}}>

          <CustomButton onClick={onClickDiscountLeftButton} sx={{ color: 'var(--color4)',":hover": {
            background: 'var(--color2)'
            }, margin: '40px 0px', float: 'left'}}>
            <ArrowLeft fontSize='large' sx={{color: 'var(--color4)'}}/>
          </CustomButton>
          <CustomButton onClick={onClickDiscountRightButton} sx={{ color: 'var(--color4)',":hover": {
            background: 'var(--color2)'
            }, margin: '40px 0px', float: 'right'}}>
            <ArrowRight fontSize='large' sx={{color: 'var(--color4)'}}/>
          </CustomButton>
          <Box sx={{margin: '10px 0px'}}>
            {discountList ? <DiscountTitle/> : null}
            {discountList ? <DiscountPayload/> : null}
          </Box>
          <Box sx={{textAlign: 'right'}}>
            <CustomButton sx={{ color: 'var(--color4)', ":hover": {
              background: 'var(--color2)'
              }}} onClick={onClickMoreDiscoutList}>
              할인 더 보기
            </CustomButton>
          </Box>

        </Box>
      </CustomBox>

      <CustomBox>
        <CustomTypography variant='h5' sx={{padding: '10px'}}>
          최신 게시글
        </CustomTypography>
      </CustomBox>      

      <CustomBox>
        <Box sx={{padding: '0px 0px 0px 10px'}}>
          <PostListTypographyTitle>제목</PostListTypographyTitle>
          <PostListTypographyWriter>게시판</PostListTypographyWriter>
          <PostListTypographyThumbs>추천수</PostListTypographyThumbs>
        </Box>          
      </CustomBox>

      <CustomBox>
        <Box sx={{padding: '0px 0px 0px 10px'}}>
          {newPostList ? <NewPostList/> : null}
        </Box>        
      </CustomBox>
      <Loading open={loading}/>
    </Contents> 
  )
}


export default Main;

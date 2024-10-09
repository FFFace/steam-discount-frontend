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

const DISCOUNT_SAMPLE_MAX_COUNT = 4;

const Main = () => {

  const navigate = useNavigate();

  const [discountList, setDiscountList] = useState();
  const [loading, setLoading] = useState(false);
  const [itemNum, setItemNum] = useState(0);
  const [notice, setNotice] = useState(null);

  const [state, setState] = useRecoilState(userState);

  useEffect(() => {
    const getRandomDiscountFive = async () => {
      setLoading(true);
      try{
        const response = await axiosInstance.get(`/discount-five`);

        setDiscountList(response.data);         

      } catch(exception){

      }
    }

    const mainNotice = async () => {
      try{
        const response = await axiosInstance.get('/posts/main-notice');

        setNotice(response.data);
      } catch(exception){

      }

      setLoading(false);
    }

    getRandomDiscountFive();
    mainNotice();
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

  const onClickMainNoticeButton = (e) => {
    e.preventDefault();
    navigate('/post', {
      state: {
        post: notice
      }
    })
  }

  const NoticeComponent = () => {
    return(
      <Link component='button' onClick={onClickMainNoticeButton}>
        <Box>
          <CustomTypography sx={{display: 'inline-block'}}>
            {notice.name}
          </CustomTypography>
        </Box>
      </Link>
    )
  }

  const DiscountTitle = () => {
    return (
      <Box sx={{display: 'flex'}}>
        <Box sx={{display: 'flex', margin: 'auto'}}>
          <img src={discountList[itemNum].image}/>   
          <CustomTypography sx={{margin: '10px 0px 5px 10px', maxWidth: '15dvw', display: 'inline-block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
            {discountList[itemNum].name}
          </CustomTypography>          
        </Box>
      </Box>
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
        <Box sx={{borderTopStyle: 'solid', borderBottomStyle: 'solid', borderWidth: '3px', borderColor: 'var(--color1)'}}>
          <Box sx={{padding: '10px'}}>
            {notice ? <NoticeComponent/> : null}
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
          <CustomButton sx={{ color: 'var(--color4)',":hover": {
            background: 'var(--color2)'
            }, 
            margin: '-40px 0px',float: 'right'}} onClick={onClickMoreDiscoutList}>
            할인 더 보기
          </CustomButton>
        </Box>
      </CustomBox>      
      <Loading open={loading}/>
    </Contents> 
  )
}


export default Main;
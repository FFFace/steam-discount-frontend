import { Box, Button, IconButton } from "@mui/material";
import Contants from "../../component/Contants"
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
import { useNavigate } from "react-router-dom";

const DISCOUNT_SAMPLE_MAX_COUNT = 4;

const Main = () => {

  const navigate = useNavigate();

  const [discountList, setDiscountList] = useState();
  const [loading, setLoading] = useState(false);
  const [itemNum, setItemNum] = useState(0);

  const [state, setState] = useRecoilState(userState);

  useEffect(() => {
    const getRandomDiscountFive = async () => {
      setLoading(true);
      try{
        const response = await axiosInstance.get(`/discount-five`);
        console.log(response.data);

        setDiscountList(response.data);         

      } catch(exception){
        console.log(exception);
      }
      setLoading(false);
    }

    const pageOpen = async () => {
      try{
        const response = await axiosInstance.get(`/token-check`)
  
        saveAccessToken(response.headers['authorization']);
        setState({
          ...state,
          isLoggedIn: true
        });
      } catch(exception){
        console.log(exception);

        setState({
          ...state,
          isLoggedIn: false
        });
      }
    }

    pageOpen();
    getRandomDiscountFive();
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

  const DiscountTitle = () => {
    return (
      <Box sx={{display: 'flex'}}>
        <Box sx={{display: 'flex', margin: 'auto'}}>
          <img src={discountList[itemNum].image}/>   
          <CustomTypography sx={{margin: '10px 0px 5px 10px', display: 'inline-block'}}>
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
    <Contants>
      <CustomBox>
        <CustomTypography variant='h5' sx={{padding: '10px'}}>
          지금 할인 중!
        </CustomTypography>
      </CustomBox>      
      <CustomBox sx={{margin: '15px', padding: '5px', backgroundColor: 'var(--color2)'}}>
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
          {discountList ? <DiscountTitle/> : <></>}
          {discountList ? <DiscountPayload/> : <></>}
        </Box>
        <CustomButton sx={{ color: 'var(--color4)',":hover": {
          background: 'var(--color2)'
          }, 
          margin: '-40px 0px',float: 'right'}} onClick={onClickMoreDiscoutList}>
          할인 더 보기
        </CustomButton>
      </CustomBox>      
      <Loading open={loading}/>
    </Contants> 
  )
}


export default Main;
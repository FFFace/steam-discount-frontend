import { Box, IconButton } from "@mui/material";
import Contants from "../../component/Contants"
import { CustomBox } from "../../component/ui/box/CustomBox";
import CustomTypography from "../../component/ui/typography/CustomTypography";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import Loading from "../../component/ui/loading/Loading";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import { CustomButton } from "../../component/ui/button/CustomButton";
import { ArrowRight } from "@mui/icons-material";

const Main = () => {

  const [discountList, setDiscountList] = useState();
  const [loading, setLoading] = useState(false);
  const [itemNum, setItemNum] = useState(0);

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

    getRandomDiscountFive();
  }, [])

  const ButtonComponent = ({...props}) => {
    return(
      <CustomButton sx={{width: '45%', margin: '10px 0px auto', color: 'var(--color1)', fontWeight: 'bold', backgroundColor: 'var(--color3)', border: 'solid 1px var(--color1)', ":hover": {borderColor: 'var(--color1)'}}} {...props}>
        {props.children}
      </CustomButton>
    )
  }

  const DiscountList = () => {
    return(
      <Box>
        <CustomTypography sx={{margin: '10px 0px 5px 0px'}}>
          {discountList[itemNum].name}
        </CustomTypography>
        <img src={discountList[itemNum].image}/>        
        <Box sx={{float: 'right'}}>
            <CustomTypography color='gray' sx={{display: 'inline', textDecoration: 'line-through'}}>{discountList[itemNum].originPrice}</CustomTypography>
            <CustomTypography>{discountList[itemNum].discountPrice}</CustomTypography>
          </Box>        
          <Box sx={{margin: '5px 20px 0px', float: 'right'}}>
            <CustomTypography color='#81F680' sx={{padding: '0px 5px 0px 5px', fontSize: '25px', backgroundColor: '#4A610A'}}>{discountList[itemNum].discountPercent}</CustomTypography>
        </Box>
        <Box>
          <CustomButton sx={{width: '50%', margin: '10px 0px auto', color: 'var(--color1)', fontWeight: 'bold', backgroundColor: 'var(--color3)', border: 'solid 1px var(--color1)', float: 'left'}}>
            <ArrowLeft fontSize='large' sx={{float: 'left', color: 'var(--color1)'}}/>
          </CustomButton>
          <CustomButton sx={{width: '50%', margin: '10px 0px auto', color: 'var(--color1)', fontWeight: 'bold', backgroundColor: 'var(--color3)', border: 'solid 1px var(--color1)', float: 'right'}}>
            <ArrowRight fontSize='large' sx={{float: 'left', color: 'var(--color1)'}}/>
          </CustomButton>
        </Box>
      </Box>
    )
  }

  return(
    <Contants>
      <CustomBox>
        <CustomTypography variant='h5' sx={{padding: '10px'}}>
          지금 할인 중!
        </CustomTypography>
      </CustomBox>      
      <CustomBox sx={{margin: '15px', padding: '5px', backgroundColor: 'var(--color2)', height: '155px'}}>
        {discountList ? <DiscountList/> : <></>}
      </CustomBox>      
      <Loading open={loading}/>
    </Contants> 
  )
}


export default Main;
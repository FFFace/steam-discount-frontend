import React, { useEffect, useState } from "react";
import Contents from "../../component/Contents";
import { Box } from "@mui/material";
import { axiosInstance } from '../../utils/axios';
import CustomTypography from '../../component/ui/typography/CustomTypography'
import styled from "styled-components";
import { CustomBox } from "../../component/ui/box/CustomBox";
import Loading from "../../component/ui/loading/Loading";



const Link = styled.a`
  color: var(--color2)
`

const DiscountList = () => {

  const [discountList, setDiscountList] = useState(null);
  const [loading, setLoading] = useState(false);

  const DiscountListComponent = () =>{    
    return discountList.map(discount =>(
      <Link key={discount.id} href={discount.link} target='_blank'>
        <CustomBox>
          <CustomTypography sx={{margin: '0px 0px 5px 0px'}}>{discount.name}</CustomTypography>
          <img src={discount.image}></img>
          <Box sx={{float: 'right'}}>
            <CustomTypography color='gray' sx={{display: 'inline', textDecoration: 'line-through'}}>{discount.originPrice}</CustomTypography>
            <CustomTypography>{discount.discountPrice}</CustomTypography>
          </Box>        
          <Box sx={{margin: '5px 20px 0px', float: 'right'}}>
            <CustomTypography color='#81F680' sx={{padding: '0px 5px 0px 5px', fontSize: '25px', backgroundColor: '#4A610A'}}>{discount.discountPercent}</CustomTypography>
          </Box>
          </CustomBox>
      </Link>
    ));
  }

  useEffect(()=>{
    setLoading(true);
    const getDiscountList = async () =>{
      try{
        const response = await axiosInstance.get('/discount-list');
        setDiscountList(response.data);
      } catch (exception){
        console.log(exception);
      }

      setLoading(false);
    }
    getDiscountList();
  }, []);

  return(
    <Contents>
      <CustomBox>
        <Box sx={{padding: '10px'}}>
          <CustomTypography variant='h5'>
            스팀 할인 목록 100
          </CustomTypography>
        </Box>
      </CustomBox>
      {discountList ? <DiscountListComponent/> : <></>}
      <Loading open={loading} />
    </Contents>
  );
};

export default DiscountList;
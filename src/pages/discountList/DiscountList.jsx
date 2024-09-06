import React, { useEffect, useState } from "react";
import Contants from "../../component/Contants";
import { Box, Typography } from "@mui/material";
import { axiosInstance } from '../../utils/axios';

const DiscountList = () => {

  const [discountList, setDiscountList] = useState(null);

  useEffect(()=>{
    const getDiscountList = async () =>{
      try{
        const response = await axiosInstance.get('/discount-list');
        setDiscountList(response.data);
        console.log(discountList);
      } catch (exception){
        console.log(exception);
      }
    }
    getDiscountList();
  }, []);

  return(
    <Contants>
      <Box sx={{backgroundColor: 'var(--color2)'}}>
        <Box sx={{padding: '10px'}}>
          <Typography variant='h5' color='var(--color4)'>
            스팀 할인 목록 100
          </Typography>
        </Box>
      </Box>
    </Contants>
  );
};

export default DiscountList;
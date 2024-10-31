import { Box, Container } from '@mui/material';
import CustomTypography from './ui/typography/CustomTypography';
import { CustomBox } from './ui/box/CustomBox';



const Footer = () =>{
  return(
    <CustomBox>
      <Box sx={{padding: '10px'}}>
        <CustomTypography sx={{fontSize: '14px', color: 'var(--color3)'}}>
          created by 전일우
        </CustomTypography>
        <CustomTypography sx={{fontSize: '14px', color: 'var(--color3)'}}>
          email: ilwoo6422@naver.com
        </CustomTypography>
      </Box>      
    </CustomBox>         
  )
};


export default Footer;
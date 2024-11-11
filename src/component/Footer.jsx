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
        <CustomTypography>
          notion: https://stellar-anger-633.notion.site/Steam-Discount-1352fb0804b5801b9aa2e354e25cd8a4
        </CustomTypography>
        <CustomTypography>
          github<br/>
          back-end: https://github.com/FFFace/steam-discount
          front-end: https://github.com/FFFace/steam-discount-frontend
        </CustomTypography>
      </Box>      
    </CustomBox>         
  )
};


export default Footer;
import { Box, Container } from '@mui/material';
import CustomTypography from './ui/typography/CustomTypography';
import { CustomBox } from './ui/box/CustomBox';
import { Link } from 'react-router-dom';



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
        <a href='https://stellar-anger-633.notion.site/Steam-Discount-1352fb0804b5801b9aa2e354e25cd8a4' target='_blank'>
          <CustomTypography sx={{fontSize: '14px', color: 'var(--color3)'}}>
            notion: https://stellar-anger-633.notion.site/Steam-Discount-1352fb0804b5801b9aa2e354e25cd8a4
          </CustomTypography>
        </a>

        <CustomTypography sx={{fontSize: '14px', color: 'var(--color3)'}}>
          github
        </CustomTypography>

        <a href='https://github.com/FFFace/steam-discount' target='_blank'>
          <CustomTypography sx={{fontSize: '14px', color: 'var(--color3)'}}>
            back-end: https://github.com/FFFace/steam-discount
          </CustomTypography>
        </a>        
        
        <a href='https://github.com/FFFace/steam-discount-frontend' target='_blank'>
          <CustomTypography sx={{fontSize: '14px', color: 'var(--color3)'}}>
            front-end: https://github.com/FFFace/steam-discount-frontend
          </CustomTypography>       
        </a>
      </Box>      
    </CustomBox>         
  )
};


export default Footer;
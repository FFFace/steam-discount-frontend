import { Typography, Box, Container, Button } from '@mui/material';
import CustomButton from './ui/button/CustomButton';



const Header = () =>{
  return(
    <Box sx={{display: 'block', margin: '30px 0px 30px 0px'}}>
      <Box sx={{backgroundColor: 'var(--color2)',}}>
        <CustomButton>
          할인 목록
        </CustomButton>
        <CustomButton>
          공지사항
        </CustomButton>
        <CustomButton>
          커뮤니티
        </CustomButton>
        <Box sx={{float:'right'}}>
          <CustomButton>
            로그인
          </CustomButton>
        </Box>
      </Box>  
    </Box>
  )
}

export default Header;
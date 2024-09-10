import { Typography, Box, Container, Button } from '@mui/material';
import CustomButton from './ui/button/CustomButton';
import { useNavigate } from 'react-router-dom';

const Header = () =>{

  const navigate = useNavigate();

  const onClickDiscountList = () =>{
    navigate('/discount-list');
  }

  const onClickLogin = () => {
    navigate('/login');
  }

  return(
    <Box sx={{display: 'block', margin: '30px 0px 30px 0px'}}>
      <Box sx={{backgroundColor: 'var(--color2)',}}>
        <CustomButton onClick={onClickDiscountList}>
          할인 목록
        </CustomButton>
        <CustomButton>
          공지사항
        </CustomButton>
        <CustomButton>
          커뮤니티
        </CustomButton>
        <Box sx={{float:'right'}}>
          <CustomButton onClick={onClickLogin}>
            로그인
          </CustomButton>
        </Box>
      </Box>  
    </Box>
  )
}

export default Header;
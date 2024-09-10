import React, { useState } from "react";
import Contants from "../../component/Contants"
import { Box, Button, TextField } from "@mui/material";
import { CustomBox } from "../../component/ui/box/CustomBox";
import CustomTypography from "../../component/ui/typography/CustomTypography";
import { CustomTextField } from "../../component/ui/textField/CustomTextField";
import {CustomButton} from "../../component/ui/button/CustomButton";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [info, setInfo] = useState({
    email: '',
    password: ''
  });

  const onChangeInfo = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    });
  }

  const onClickRegister = (e) => {
    navigate('/user-register');
  }

  const ButtonComponent = ({...props}) => {
    return(
      <CustomButton fullWidth sx={{margin: '10px 0px auto', color: 'var(--color1)', fontWeight: 'bold', backgroundColor: 'var(--color3)', ":hover": {boa: 'var(--color1)'}}} {...props}>
        {props.children}
      </CustomButton>
    )
  }

  return (
    <Contants>
      <CustomBox>
        <CustomTypography variant='h5'>
          로그인
        </CustomTypography>
      </CustomBox>
      <CustomBox>
        {/* <TextField label='ID' sx={{display: 'flex', 
          '& .MuiOutlinedInput-notchedOutline':{borderColor: 'var(--color2)', backgroundColor: 'var(--color1)',
          },
          '& .MuiInputLabel-outlined': {color: 'var(--color4)'},
          }}/> */}
        <CustomTypography sx={{margin: '5px'}} >이메일</CustomTypography>
        <CustomTextField name='email' onChange={onChangeInfo} value={info.email}/>
        <CustomTypography sx={{margin: '5px'}} >비밀번호</CustomTypography>
        <CustomTextField name='password' onChange={onChangeInfo} value={info.password}/>

        <Box sx={{margin: '25px 0px auto'}}>
          <ButtonComponent>
            로그인
          </ButtonComponent>
          <ButtonComponent onClick={onClickRegister}>
            회원가입
          </ButtonComponent>
        </Box>
      </CustomBox>
    </Contants>
  );
};

export default Login;
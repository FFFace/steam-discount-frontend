import React, { useEffect, useState } from "react";
import Contants from "../../component/Contants"
import { Box, DialogActions, DialogTitle} from "@mui/material";
import { CustomBox } from "../../component/ui/box/CustomBox";
import CustomTypography from "../../component/ui/typography/CustomTypography";
import { CustomTextField } from "../../component/ui/textField/CustomTextField";
import {CustomButton} from "../../component/ui/button/CustomButton";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";
import { setLoginState, saveAccessToken } from "../../utils/storage";
import { CustomDialog, CustomDialogContent, CustomDialogTitle } from "../../component/ui/dialog/CustomDialog";
import Loading from "../../component/ui/loading/Loading";

const Login = () => {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const onClickRegister = () => {
    navigate('/user-register');
  }

  const ButtonComponent = ({...props}) => {
    return(
      <CustomButton fullWidth sx={{margin: '10px 0px auto', color: 'var(--color1)', fontWeight: 'bold', backgroundColor: 'var(--color3)', ":hover": {boa: 'var(--color1)'}}} {...props}>
        {props.children}
      </CustomButton>
    )
  }

  const onClickLoginButton = async () => {
    setLoading(true);
    try{
      const response = await axiosInstance.post(`/users/login`, {
        email: info.email,
        password: info.password
      });

      saveAccessToken(response.headers['authorization']);
      setIsLogin(true);

    } catch(exception){
      console.log(exception);
    }

    setLoading(false);
  }

  useEffect(() => {
    setLoginState(true);
  }, [isLogin])

  const LoginSuccess = () => {
    return(
      <CustomDialog open={isLogin}>
        <CustomDialogTitle>로그인 성공</CustomDialogTitle>
        <CustomDialogContent>
          로그인되었습니다.<br/>
          타이틀로 돌아갑니다.<br/>
        </CustomDialogContent>
        <DialogActions>
          <CustomButton onClick={onClickLoginSuccess}>확인</CustomButton>
        </DialogActions>
      </CustomDialog>
    );
  }

  const onClickLoginSuccess = () => {
    navigate('/');
  }

  return (
    <Contants>
      <Loading open={loading} />
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

        <Box sx={{margin: '25px 0px auto'}} onClick={onClickLoginButton}>
          <ButtonComponent onClick={onClickLoginButton}>
            로그인
          </ButtonComponent>
          <ButtonComponent onClick={onClickRegister}>
            회원가입
          </ButtonComponent>
        </Box>
      </CustomBox>
      <LoginSuccess/>
    </Contants>
  );
};

export default Login;
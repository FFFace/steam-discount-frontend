import { useEffect, useState } from "react";
import Contants from "../../component/Contants";
import { CustomBox } from "../../component/ui/box/CustomBox";
import { CustomButton, CustomButtonWhite } from "../../component/ui/button/CustomButton";
import { CustomTextField } from "../../component/ui/textField/CustomTextField";
import CustomTypography from "../../component/ui/typography/CustomTypography";
import { Alert, typographyClasses } from "@mui/material";
import { axiosInstance } from "../../utils/axios";

const ALTER_ERROR_NOT_INPUT_ALL_INFOMATION = '모든 정보를 입력해주세요.';
const ALTER_ERROR_NOT_MACHING_PASSWORD = '패스워드가 일치하지 않습니다.';
const ALTER_ERROR_WRONG_EMAIL = '이메일 형식이 잘못되었습니다.';
const ALTER_ERROR_TOO_SHORT_PASSWORD = '패스워드를 8자 이상 입력해주세요';

const ALTER_SUCCESS = '회원가입을 진행해주세요';

const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

const UserRegister = () => {

  const [alter, setAlter] = useState({
    severity: 'error',
    message: ALTER_ERROR_NOT_INPUT_ALL_INFOMATION
  });

  const [info, setInfo] = useState({
    email: '',
    password: '',
    passwordValidator: '',
    nickname: '',
  });

  const [resistable, setResistable] = useState(false);

  const onChangeInfo = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    });
  };

  const onClickRegister = async () => {
    try{
      const response = await axiosInstance.post('/users', {
          email: info.email,
          password: info.password,
          nickname: info.nickname
        }
      );
      console.log(response.data);
    } catch (exception){
      console.log(exception);
    }
  };

  const checkAlter = () => {
    emailRegEx.test(info.email)
    setResistable(false);

    if(info.email === '' || info.password === '' || info.passwordValidator === '' || info.nickname === ''){
      changeAlter('error', ALTER_ERROR_NOT_INPUT_ALL_INFOMATION)
      return;
    }

    if(!emailRegEx.test(info.email)){
      changeAlter('error', ALTER_ERROR_WRONG_EMAIL);
      return;
    }

    if(info.password.length < 8){
      changeAlter('error', ALTER_ERROR_TOO_SHORT_PASSWORD);
      return;
    }

    if(info.password !== info.passwordValidator){
      changeAlter('error', ALTER_ERROR_NOT_MACHING_PASSWORD)
      return;
    }

    changeAlter('success', ALTER_SUCCESS);
    setResistable(true);
  }

  const changeAlter = (newSeverity, newMessage) => {
    setAlter({
      severity: newSeverity,
      message: newMessage
    })
  }

  useEffect(() => {
    checkAlter();
  }, [info]);

  return (
    <Contants>
      <CustomBox>
        <CustomTypography variant='h5'>
          회원 가입
        </CustomTypography>
        <CustomTypography sx={{margin: '5px 0px auto'}}>
          아래에 모든 정보를 입력해주세요.
        </CustomTypography>
      </CustomBox>
      <CustomBox>
        <CustomTypography sx={{margin: '0px 15px 0px auto', display: 'inline'}}>이메일</CustomTypography>
        <CustomButtonWhite size='small' sx={{color: 'var(--color1)', backgroundColor: 'var(--color3)', ":hover": {boardColor: 'var(--color1)'}}}>중복검사</CustomButtonWhite>
        <CustomTextField name='email' onChange={onChangeInfo}/>

        <CustomTypography >비밀번호</CustomTypography>
        <CustomTextField name='password' onChange={onChangeInfo}/>

        <CustomTypography>비밀번호 확인</CustomTypography>
        <CustomTextField name='passwordValidator' onChange={onChangeInfo}/>

        <CustomTypography sx={{margin: '0px 15px 0px auto', display: 'inline'}}>별명</CustomTypography>
        <CustomButtonWhite size='small' sx={{color: 'var(--color1)', backgroundColor: 'var(--color3)', ":hover": {boardColor: 'var(--color1)'}}}>중복검사</CustomButtonWhite>
        <CustomTextField name='nickname' onChange={onChangeInfo}/>

        <Alert severity={alter.severity}>{alter.message}</Alert>

        {resistable ? (<CustomButtonWhite onClick={onClickRegister}>회원가입</CustomButtonWhite>) : <CustomButtonWhite disabled>회원가입</CustomButtonWhite>}
      </CustomBox>
    </Contants>
  );
};



export default UserRegister;
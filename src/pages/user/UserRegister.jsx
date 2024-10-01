import { useEffect, useState } from "react";
import Contants from "../../component/Contants";
import { CustomBox } from "../../component/ui/box/CustomBox";
import { CustomButton, CustomButtonWhite } from "../../component/ui/button/CustomButton";
import { CustomTextField } from "../../component/ui/textField/CustomTextField";
import CustomTypography from "../../component/ui/typography/CustomTypography";
import { Alert, typographyClasses } from "@mui/material";
import { axiosInstance } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../component/ui/loading/Loading";

const ALTER_ERROR_NOT_INPUT_ALL_INFOMATION = '모든 정보를 입력해주세요.';
const ALTER_ERROR_NOT_MACHING_PASSWORD = '패스워드가 일치하지 않습니다.';
const ALTER_ERROR_WRONG_EMAIL = '이메일 형식이 잘못되었습니다.';
const ALTER_ERROR_TOO_SHORT_PASSWORD = '패스워드를 8자 이상 입력해주세요.';
const ALTER_ERROR_NEED_EMAIL_CHECK_DUPLICATE = '이메일 중복검사를 진행하지 않았습니다.';
const ALTER_ERROR_NEED_NICKNAME_CHECK_DUPALICATE = '별명 중복검사를 진행하지 않았습니다.';
const ALTER_ERROR_EMAIL_DUPLICATE_FAIL = '이미 사용중인 이메일 입니다.';
const ALTER_ERROR_NICKNAME_DUPLICATE_FAIL = '이미 사용중인 별명 입니다.';

const TYPOGRAPHY_NEED_DUPLICATE_EMAIL = '이메일 중복검사가 필요합니다.';
const TYPOGRAPHY_FAIL_DUPLICATE_EMAIL = '이미 사용중인 이메일 입니다.';
const TYPOGRAPHY_DUPLICATE_EMAIL = '사용할 수 있는 이메일 입니다.';

const TYPOGRAPHY_NEED_DUPLICATE_NICKNAME = '별명 중복검사가 필요합니다.';
const TYPOGRAPHY_FAIL_DUPLICATE_NICKNAME = '이미 사용중인 별명 입니다.';
const TYPOGRAPHY_DUPLICATE_NICKNAME = '사용할 수 있는 이메일 입니다.';

const ALTER_SUCCESS = '회원가입을 진행해주세요';

const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}/;

const UserRegister = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [alter, setAlter] = useState({
    severity: 'error',
    message: ALTER_ERROR_NOT_INPUT_ALL_INFOMATION
  });

  const [duplicateInfo, setDuplicateInfo] = useState({
    email: TYPOGRAPHY_NEED_DUPLICATE_EMAIL,
    nickname: TYPOGRAPHY_NEED_DUPLICATE_NICKNAME
  });

  const [info, setInfo] = useState({
    email: '',
    password: '',
    passwordValidator: '',
    nickname: '',
  });

  const [resistable, setResistable] = useState(false);

  const [duplicateCheck, setDuplicateCheck] = useState({
    email: false,
    nickname: false
  });

  const [duplicate, setDuplicate] = useState({
    email: false,
    nickname: false,
  })

  const onChangeInfo = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    });
  };

  const onClickRegister = async () => {
    setLoading(true);

    try{
      await axiosInstance.post('/users', {
          email: info.email,
          password: info.password,
          nickname: info.nickname
        }
      );

      navigate('/email-validation', {
        state: {
          email: info.email
        }
      });
    } catch (exception){
      console.log(exception);
    }

    setLoading(false);
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

    if(!duplicateCheck.email){
      changeAlter('error', ALTER_ERROR_NEED_EMAIL_CHECK_DUPLICATE);
      return;
    }

    if(!duplicate.email){
      changeAlter('error', ALTER_ERROR_EMAIL_DUPLICATE_FAIL);
      return;
    }

    if(info.password.length < 8 || !passwordRegEx.test(info.password)){
      changeAlter('error', ALTER_ERROR_TOO_SHORT_PASSWORD);
      return;
    }

    if(info.password !== info.passwordValidator){
      changeAlter('error', ALTER_ERROR_NOT_MACHING_PASSWORD)
      return;
    }

    if(!duplicateCheck.nickname){
      changeAlter('error', ALTER_ERROR_NEED_NICKNAME_CHECK_DUPALICATE);
      return;
    }

    if(!duplicate.nickname){
      changeAlter('error', ALTER_ERROR_NICKNAME_DUPLICATE_FAIL);
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
  }, [info, duplicate, duplicateCheck, duplicateInfo]);

  const onClickDuplicateEmail = async () => {
    try{
      if(info.email === '')
        return;

      const response = await axiosInstance.post(`/users/duplicate-email`, {
        email: info.email
      });

      setDuplicate({
        ...duplicate,
        email: response.data
      });

      setDuplicateCheck({
        ...duplicateCheck,
        email: response.data
      });

      setDuplicateInfo({
        ...duplicateInfo,
        email: response.data ? TYPOGRAPHY_DUPLICATE_EMAIL : TYPOGRAPHY_FAIL_DUPLICATE_EMAIL
      })

      console.log(duplicate, duplicateCheck, duplicateInfo);

    } catch(exception){
      console.log(exception);
    }
  }

  const onClickDuplicateNickname = async () => {
    try{
      if(info.nickname === '')
        return;

      const response = await axiosInstance.post(`/users/duplicate-nickname`, {
        nickname: info.nickname
      });

      setDuplicate({
        ...duplicate,
        nickname: response.data
      });

      setDuplicateCheck({
        ...duplicateCheck,
        nickname: response.data
      });

      setDuplicateInfo({
        ...duplicateInfo,
        nickname: response.data ? TYPOGRAPHY_DUPLICATE_NICKNAME : TYPOGRAPHY_FAIL_DUPLICATE_NICKNAME
      });

    } catch(exception){
      console.log(exception);
    }
  }

  return (
    <Contants>
      <Loading open={loading} />
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
        <CustomButtonWhite size='small' sx={{display: 'inline', color: 'var(--color1)', backgroundColor: 'var(--color3)', ":hover": {boardColor: 'var(--color1)'}}} onClick={onClickDuplicateEmail}>중복검사</CustomButtonWhite>
        <CustomTypography sx={{margin: '0px 0px 0px 10px', display: 'inline'}}>{duplicateInfo.email}</CustomTypography>
        <CustomTextField name='email' onChange={onChangeInfo}/>

        <CustomTypography >비밀번호</CustomTypography>
        <CustomTextField type='password' name='password' onChange={onChangeInfo}/>

        <CustomTypography>비밀번호 확인</CustomTypography>
        <CustomTextField type='password' name='passwordValidator' onChange={onChangeInfo}/>

        <CustomTypography sx={{margin: '0px 15px 0px auto', display: 'inline'}}>별명</CustomTypography>
        <CustomButtonWhite size='small' sx={{color: 'var(--color1)', backgroundColor: 'var(--color3)', ":hover": {boardColor: 'var(--color1)'}}} onClick={onClickDuplicateNickname}>중복검사</CustomButtonWhite>
        <CustomTypography sx={{margin: '0px 0px 0px 10px', display: 'inline'}}>{duplicateInfo.nickname}</CustomTypography>
        <CustomTextField name='nickname' onChange={onChangeInfo}/>

        <Alert severity={alter.severity}>{alter.message}</Alert>

        {resistable ? (<CustomButtonWhite onClick={onClickRegister}>회원가입</CustomButtonWhite>) : <CustomButtonWhite disabled>회원가입</CustomButtonWhite>}
      </CustomBox>
    </Contants>
  );
};



export default UserRegister;
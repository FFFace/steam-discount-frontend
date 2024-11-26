import React, { useEffect, useState } from "react";
import Contents from "../../component/Contents";
import { Box, DialogActions, dialogActionsClasses, DialogTitle} from "@mui/material";
import { CustomBox } from "../../component/ui/box/CustomBox";
import CustomTypography from "../../component/ui/typography/CustomTypography";
import { CustomTextField } from "../../component/ui/textField/CustomTextField";
import {CustomButton, CustomButtonWhite} from "../../component/ui/button/CustomButton";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";
import { setLoginState, saveAccessToken } from "../../utils/storage";
import { CustomDialog, CustomDialogAlarm, CustomDialogContent, CustomDialogError, CustomDialogTitle } from "../../component/ui/dialog/CustomDialog";
import Loading from "../../component/ui/loading/Loading";
import { LoginFailed, NeedDuplicateEmail } from "../../component/ui/error/error";
import { useRecoilState } from "recoil";
import { userState } from "../../utils/atom";

const Login = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState({
    loginFailed: false,
    needDuplicateEmail: false,
  })

  const [errorInfo, setErrorInfo] = useState({
    open: false,
    title: null,
    content: null,
    dialogAction: null
  })

  const [alarmInfo, setAlarmInfo] = useState({
    open: false,
    title: null,
    content: null,
    dialogAction: null
  })

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

  const [state, setState] = useRecoilState(userState);

  const onClickRegister = () => {
    navigate('/user-register');
  }

  const LogInOutButton = ({...props}) => {
    return(
      <CustomButton fullWidth sx={{margin: '10px 0px auto', color: 'var(--color1)', fontWeight: 'bold', backgroundColor: 'var(--color3)', ":hover": {boa: 'var(--color1)'}}} {...props}>
        {props.children}
      </CustomButton>
    )
  }

  const onClickLoginButton = async () => {

    if(info.email.length < 1 || info.password.length < 1){

      const dialogAction = () => {
        setErrorInfo({open: false})
      }

      setErrorInfo({
        open: true,
        title: '로그인 에러',
        content: '이메일과 비밀번호 항목을 모두 채워주세요.',
        dialogAction: dialogAction
      });

      return;
    }

    setLoading(true);
    try{
      const response = await axiosInstance.post(`/login`, {
        email: info.email,
        password: info.password
      });

      setState({
        ...state,
        isLoggedIn: true
      })

    } catch(exception){
      console.log(exception.response);

      if(exception.response.status === 400){

        const dialogAction = () => {
          setErrorInfo({open: false});
        }

        setErrorInfo({
          open: true,
          title: '로그인 실패',
          content: '로그인에 실패했습니다.\n이메일 또는 비밀번호를 확인해 주세요.',
          dialogAction: dialogAction
        });
      } else if(exception.response.status === 403){

        const dialogAction = () => {
          setErrorInfo({open: false});
        }

        setAlarmInfo({
          open: true,
          title: '인증이 필요한 이메일',
          content: '해당 계정은 이메일 인증이 진행 중 입니다.\n이메일 인증 페이지로 이동합니다.',
          dialogAction: dialogAction
        });

      }
    }

    setLoading(false);
  }

  const LoginSuccess = () => {
    return(
      <CustomDialog open={state.isLoggedIn}>
        <CustomDialogTitle>로그인 성공</CustomDialogTitle>
        <CustomDialogContent>
          로그인되었습니다.<br/>
          이전 페이지로 돌아갑니다.<br/>
        </CustomDialogContent>
        <DialogActions>
          <CustomButton onClick={onClickLoginSuccess}>확인</CustomButton>
        </DialogActions>
      </CustomDialog>
    );
  }

  const loginFailedDialogAccept = () => {
    setErrorState({
      ...errorState,
      loginFailed: false
    });
  }

  const needDuplicateDialogAccept = () => {
    setErrorState({
      ...errorState,
      needDuplicateEmail: false
    });

    navigate('/email-validation', {
      state: {
        email: info.email
      }
    });
  }

  const onClickLoginSuccess = () => {
    navigate(-1);
  }

  return (
    <Contents>
      <CustomBox>
        <Box sx={{padding: '10px'}}>
          <CustomTypography variant='h5'>
            로그인
          </CustomTypography>
        </Box>
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
        <CustomTextField type='password' name='password' onChange={onChangeInfo} value={info.password}/>

        <Box sx={{margin: '25px 0px auto'}}>
          <CustomButtonWhite href="/oauth2/authorization/google">
            구글 로그인
          </CustomButtonWhite>
          <LogInOutButton onClick={onClickLoginButton}>
            로그인
          </LogInOutButton>
          <LogInOutButton onClick={onClickRegister}>
            회원가입
          </LogInOutButton>
        </Box>
      </CustomBox>
      <LoginSuccess/>
      <LoginFailed loginFailedOpen={errorState.loginFailed} loginFailedDialogAccept={loginFailedDialogAccept}/>
      <NeedDuplicateEmail needDuplicateOpen={errorState.needDuplicateEmail} needDuplicateDialogAccept={needDuplicateDialogAccept}/>
      <CustomDialogError open={errorInfo.open} title={errorInfo.title} content={errorInfo.content} dialogAction={errorInfo.dialogAction}/>
      <CustomDialogAlarm open={alarmInfo.open} title={errorInfo.title} content={errorInfo.content} dialogAction={errorInfo.dialogAction}/>
      <Loading open={loading} />
    </Contents>
  );
};

export default Login;
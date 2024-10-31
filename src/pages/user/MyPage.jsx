import { Box, DialogActions, TextField } from "@mui/material";
import Contents from "../../component/Contents"
import { CustomBox } from "../../component/ui/box/CustomBox";
import CustomTypography from "../../component/ui/typography/CustomTypography";
import { CustomTextField } from "../../component/ui/textField/CustomTextField";
import { CustomButton, CustomButtonWhite } from "../../component/ui/button/CustomButton";
import { useEffect, useRef, useState } from "react";
import Loading from "../../component/ui/loading/Loading";
import { CustomDialog, CustomDialogAlarm, CustomDialogContent, CustomDialogError, CustomDialogErrorTitle, CustomDialogTitle, CustomDialogWarning } from "../../component/ui/dialog/CustomDialog";
import { load } from "react-cookies";
import { axiosInstance } from "../../utils/axios";
import { useRecoilState } from "recoil";
import { userState } from "../../utils/atom";
import { useNavigate } from "react-router-dom";
import { removeAccessToken, removeRefreshToken } from "../../utils/storage";

const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}/;

const MyPage = () => {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('nickname');
  const [recoilState, setRecoilState] = useRecoilState(userState);
  const [errorInfo, setErrorInfo] = useState({
    open: false,
    title: null,
    content: null,
  });

  const [alarmInfo, setAlarmInfo] = useState({
    open: false,
    title: null,
    content: null,
    dialogAction: null
  });

  const [warningInfo, setWarningInfo] = useState({
    open: false,
    title: null,
    content: null,
    dialogActionAccept: null,
    dialogActionCancle: null
  })

  const [accountDisable, setAccountDisable] = useState(false);

  const [passwordModify, setPasswordModify] = useState(false);
  const [passwordModifyInfo, setPasswordModifyInfo] = useState({
    oldPassword: '',
    newPassword: '',
    newPasswordValid: ''
  });

  const navigate = useNavigate();

  useEffect(()=>{
    if(!recoilState.isLoggedIn){
      navigate('/');
    }
  }, [recoilState])

 

  useEffect(()=>{
    setLoading(true);

    const getUserInfo = async() => {
      try{
        const response = await axiosInstance.get(`/users/email`);
        
        setEmail(response.data);
      } catch(exception){
        console.log(exception);
      }
      setLoading(false);
    }

    getUserInfo();
  }, []);

  const onClickNicknameModify = async (nickname) => {
    try{
      setLoading(true);

      await axiosInstance.patch(`/users/nickname`, {
        nickname: nickname
      });

      const dialogAction = () => {
        setAlarmInfo({
          open: false
        });

        window.location.reload();
      }

      setAlarmInfo({
        open: true,
        title: '별명 변경 성공',
        content: '별명 변경에 성공했습니다.',
        dialogAction: dialogAction
      });

    } catch(exception){
      setErrorInfo({
        open: false,
        title: '별명 변경 실패',
        content: '별명 변경에 실패했습니다.\n다시 시도해 주세요.'
      })
    }

    setLoading(false);
  }

  const UserInfo = ({name, value, modifiable, action}) => {
    const [disable, setDisable] = useState(false);
    const inputRef = useRef();

    const onClickModifyCancleButton = (e) => {
      e.preventDefault();

      setDisable(false);
      inputRef.current.value = value;
    }

    const onClickModifyButton = (e) => {
      e.preventDefault();

      action(inputRef.current?.value);
    }

    const ModifyButton = ({onClickModifyButton, onClickModifyCancleButton}) => {
      return(
        <Box sx={{float: 'right'}}>
          <CustomButton onClick={onClickModifyButton}>
            변경하기
          </CustomButton>
          <CustomButton onClick={onClickModifyCancleButton}>
            취소
          </CustomButton>
        </Box> 
      )
    }

    return(
      <Box sx={{padding: '10px'}}>
        <Box sx={{margin: '0px 0px 10px 0px'}}>
          <CustomTypography sx={{display: 'inline-block', padding: '5px'}}>
            {name}
          </CustomTypography>
          {modifiable && !disable ? 
            <Box sx={{float: 'right'}}>
              <CustomButton onClick={()=>setDisable(true)}>
                변경
              </CustomButton>
            </Box> 
            : null}
          {disable ? <ModifyButton onClickModifyButton={onClickModifyButton} onClickModifyCancleButton={onClickModifyCancleButton}/> : null}
        </Box>       
        
        {disable ? 
          <CustomTextField defaultValue={value} inputRef={inputRef}/>
          :
          <CustomTextField defaultValue={value} disabled/>}
      </Box>
    )    
  }

  const PasswordInfo = () => {

    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const newPasswordValidRef = useRef();

    const onClickModifyPassword = async () => {

      if(oldPasswordRef.current?.value.length < 1){
        setErrorInfo({
          open: true,
          title: '비밀번호 변경 오류',
          content: '현재 비밀번호를 입력해 주세요.'
        });

      }
      else if(newPasswordRef.current?.value.length < 8 || !passwordRegEx.test(newPasswordRef.current?.value)){
        setErrorInfo({
          open: true,
          title: '비밀번호 변경 오류',
          content: '비밀번호는 길이가 8글자 이상 길어야 하며\n숫자, 문자, 특수문자가 1개 이상 포함되어야 합니다.'
        });

        return;
      } else if(newPasswordRef.current?.value !== newPasswordValidRef.current?.value){
        setErrorInfo({
          open: true,
          title: '비밀번호 변경 오류',
          content: '변경할 비밀번호와 비밀번호 확인이 일치하지 않습니다.\n다시 한번 확인해 주세요.'
        });

        return;
      }

      try{
        setLoading(true);
        await axiosInstance.patch(`/users/password`, {
            oldPassword: oldPasswordRef.current?.value,
            newPassword: newPasswordRef.current?.value,
            newPasswordValid: newPasswordValidRef.current?.value
        })

        const dialogAction = () => {
          setAlarmInfo({
            open:false
          });

          setPasswordModify(false);
          setPasswordModifyInfo({
            oldPassword: '',
            newPassword: '',
            newPasswordValid: ''
          })
        }

        setAlarmInfo({
          open: true,
          title: '비밀번호 변경 성공',
          content: '정상적으로 비밀번호를 변경했습니다.',
          dialogAction: dialogAction
        });

      } catch(exception){
        setErrorInfo({
          open: true,
          title: '비밀번호 변경 실패',
          content: '비밀번호 변경에 실패했습니다.\n비밀번호 확인 후 다시 한번 시도해 주세요.'
        });
      }

      setLoading(false);
    }

    return (
      <Box sx={{padding: '10px', borderStyle: 'solid', borderWidth: '3px', borderColor: 'var(--color1)'}}>
        <CustomTypography sx={{display: 'inline-block', padding: '5px'}}>
          현재 비밀번호
          </CustomTypography>
        <CustomTextField name='oldPassword' type='password' inputRef={oldPasswordRef}/>

        <Box sx={{margin: '0px 0px 10px 0px'}}>
          <CustomTypography sx={{display: 'inline-block', padding: '5px'}}>
            변경할 비밀번호
          </CustomTypography >
        </Box>
        <CustomTextField name='newPassword' type='password' inputRef={newPasswordRef}/>

        <Box sx={{margin: '0px 0px 10px 0px'}}>
          <Box sx={{margin: '0px 0px 10px 0px'}}>
            <CustomTypography sx={{display: 'inline-block', padding: '5px'}}>
              변경할 비밀번호 확인
            </CustomTypography>
            <Box sx={{float: 'right'}}>       
          </Box>
          </Box> 
        </Box>
        <CustomTextField name='newPasswordValid' type='password' inputRef={newPasswordValidRef}/>

        <CustomButtonWhite onClick={onClickModifyPassword}>비밀번호 변경하기</CustomButtonWhite>
      </Box>
    )
  }

  const onClickPasswordModifyButton = (e) => {
    e.preventDefault();
    setPasswordModify(!passwordModify);
  }

  const onClickWritedPostList = (e) => {
    e.preventDefault();
    
    navigate('/writed-post-list');
  }

  const onClickAccountDisable = (e) => {
    e.preventDefault();

    const dialogActionCancle = () => {
      setWarningInfo({
        ...warningInfo,
        open: false
      });
    }

    const dialogActionAccept = () => {
      setAccountDisable(true);

      dialogActionCancle();
    }

    setWarningInfo({
      open: true,
      title: '회원 탈퇴',
      content: '회원 탈퇴를 하게되면 일부 서비스를 이용하실 수 없습니다.\n정말로 탈퇴 하시겠습니까?',
      dialogActionAccept: dialogActionAccept,
      dialogActionCancle: dialogActionCancle
    })
  }

  const AccountDisableDialog = () => {

    const accountDisableString = '더 이상 서비스를 이용하지 않겠습니다.';
    const inputRef = useRef();

    const onClickAccoutDisableButton = async (e) =>{
      e.preventDefault();

      if(inputRef.current?.value !== accountDisableString){

        const dialogAction = () => {
          setErrorInfo({
            ...errorInfo,
            open: false
          });
          setAccountDisable(false);
        }

        setErrorInfo({
          open: true,
          title: '회원 탈퇴 실패',
          content: '입력된 문장이 정확히 입력되지 않았습니다.\n다시 시도해 주세요.',
          dialogAction: dialogAction
        })
      }

      setLoading(true);
      try{
        await axiosInstance.put('/users/disable');

        const dialogAction = () => {
          setRecoilState({
            ...recoilState,
            isLoggedIn: false,
            nickname: null,
            role: null
          })
  
          removeAccessToken();
          removeRefreshToken();

          navigate('/');
        }

        setAlarmInfo({
          open: true,
          title: '회원 탈퇴 완료',
          content: '회원 탈퇴가 정상적으로 완료되었습니다.\n그동안 이용해주셔서 감사합니다.',
          dialogAction: dialogAction
        })
      } catch(exception){
        console.log(exception);
      }

      setLoading(false);
    }

    return(
      <CustomDialog open={accountDisable}>
        <CustomDialogErrorTitle>회원 탈퇴</CustomDialogErrorTitle>
        <CustomDialogContent>
          회원 탈퇴를 진행하기 위해 아래의 문장을 정확히 입력해 주세요.<br/><br/><br/>
          "{accountDisableString}"
        </CustomDialogContent>
        <Box sx={{textAlign: 'center'}}>
          <TextField size="small" inputRef={inputRef} sx={{width: '90%', padding: '10px', ' .MuiOutlinedInput-root': {
            color: 'white',
            border: 'solid 1px var(--color2)',
            backgroundColor: 'var(--color2)',
            '&.Mui-focused fieldset': {
              border: 'solid 2px gray'
            }
          },
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: 'var(--color3)'
          }}}/>
        </Box>
        
        <DialogActions>
          <CustomButton onClick={onClickAccoutDisableButton}>
            회원 탈퇴
          </CustomButton>
        </DialogActions>
      </CustomDialog>
    )
  }

  return(
    <Contents>
      <CustomBox>
        <Box sx={{padding: '10px'}}>
          <CustomTypography variant='h5'>
            마이 페이지
          </CustomTypography>
        </Box>
      </CustomBox>
        
      <CustomBox>
        <UserInfo tag={'email'} name={'이메일'} value={email || 'email'} />
        <UserInfo tag={'nickname'} name={'별명'} value={recoilState.nickname || 'nickname'} modifiable={true} action={onClickNicknameModify}/>
        {passwordModify ? <PasswordInfo/> : null}

        <Box sx={{padding: '10px'}}>
          <CustomButtonWhite onClick={onClickPasswordModifyButton}>{passwordModify ? '비밀번호 변경 취소' : '비밀번호 변경'}</CustomButtonWhite>
          <CustomButtonWhite onClick={onClickWritedPostList}>내가 쓴 글</CustomButtonWhite>
          <CustomButtonWhite onClick={onClickAccountDisable}>회원 탈퇴</CustomButtonWhite>
        </Box>

      </CustomBox>
      <AccountDisableDialog/>
      <CustomDialogError open={errorInfo.open} title={errorInfo.title} content={errorInfo.content} dialogAction={() => setErrorInfo({
        ...errorInfo,
        open: false
      })}/>
      <CustomDialogAlarm open={alarmInfo.open} title={alarmInfo.title} content={alarmInfo.content} dialogAction={alarmInfo.dialogAction}/>
      <CustomDialogWarning open={warningInfo.open} title={warningInfo.title} content={warningInfo.content} dialogActionAccept={warningInfo.dialogActionAccept} dialogActionCancle={warningInfo.dialogActionCancle}/>
      <Loading open={loading}/>
    </Contents>
  )
}

export default MyPage;
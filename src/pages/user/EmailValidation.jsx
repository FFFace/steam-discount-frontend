import { useLocation, useNavigate } from "react-router-dom";
import Contents from "../../component/Contents";
import { CustomBox } from "../../component/ui/box/CustomBox";
import { CustomButton, CustomButtonWhite } from "../../component/ui/button/CustomButton";
import { CustomTextField } from "../../component/ui/textField/CustomTextField";
import CustomTypography from "../../component/ui/typography/CustomTypography";
import { axiosInstance } from "../../utils/axios";
import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Loading from "../../component/ui/loading/Loading";
import { CustomDialog, CustomDialogContent, CustomDialogTitle } from "../../component/ui/dialog/CustomDialog";
import { useRecoilState } from "recoil";
import { userState } from "../../utils/atom";


const EmailValidation = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const verifyEmail = location.state.email;
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyDialogOpen, setVerifyDialogOpen] = useState({
    success: false,
    fail: false,
  });
  const [loading, setLoading] = useState(false);
  const [recoilState, setRecoilState] = useRecoilState(userState);

  useEffect(()=>{
    if(recoilState.isLoggedIn) {
      navigate('/');
    }
  }, [recoilState]);

  const onClickVerify = async () => {

    setLoading(true);

    try{
      const response = await axiosInstance.patch('/users/verify', {
        email: verifyEmail,
        code: verifyCode,
      }
    )

    if(response.data){
      setVerifyDialogOpen({
        success: true,
        fail: false
      })
    } else {
      setVerifyDialogOpen({
        success: false,
        fail: true
      })
    }

    } catch (exception){ 
      console.log(exception);
    }

    setLoading(false);
  }

  const onChangeCode = (e) => {
    setVerifyCode(e.target.value);
  }

  const onClickAccept = () => {
    setVerifyDialogOpen({
      success: false,
      fail: false
    })
  }

  const onClickAcceptAtSuccess = () => {
    onClickAccept();
    navigate('/');
  }

  const VerifyFailDialog = () => {
    return (
      <CustomDialog open={verifyDialogOpen.fail}>
        <CustomDialogTitle >인증 실패</CustomDialogTitle>
        <CustomDialogContent >
          인증 코드가 일치하지 않습니다.<br/>
          인증 코드를 다시 한 번 입력해주세요.
        </CustomDialogContent>
        <DialogActions>
          <CustomButton onClick={onClickAccept}>
            확인
          </CustomButton>
        </DialogActions>        
      </CustomDialog>
    )
  }

  const VerifySuccessDialog = () => {
    return (
      <Dialog sx={{'& .MuiPaper-root': {
        backgroundColor: 'var(--color1)'
      }}} open={verifyDialogOpen.success}>
        <CustomDialogTitle>인증 성공</CustomDialogTitle>
        <CustomDialogContent>
          감사합니다. 회원가입이 완료되었습니다.<br/>
          메인 페이지로 이동합니다.
        </CustomDialogContent>
        <DialogActions>
          <CustomButton onClick={onClickAcceptAtSuccess}>
            확인
          </CustomButton>
        </DialogActions>        
      </Dialog>
    )
  }

  return (
    <Contents>
      <Loading open={loading} />
      <CustomBox>
        <CustomTypography variant='h5'>
          이메일 인증
        </CustomTypography>
      </CustomBox>

      <CustomBox>
        <CustomTypography>
          회원가입 마지막 단계입니다!<br/><br/>
          회원가입을 위해 입력하신 이메일로 '인증 코드'를 발송했습니다.<br/>
          해당 '인증 코드'를 아래에 입력해주세요.<br/><br/>
        </CustomTypography>
        <CustomTypography>인증 코드</CustomTypography>
        <CustomTextField onChange={onChangeCode}/>
        <CustomButtonWhite onClick={onClickVerify}>인증</CustomButtonWhite>
      </CustomBox>
      <VerifyFailDialog/>
      <VerifySuccessDialog/>
    </Contents>
  )
}


export default EmailValidation;
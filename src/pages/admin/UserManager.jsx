import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Contents from "../../component/Contents"
import { CustomBox } from "../../component/ui/box/CustomBox";
import { useEffect, useState } from "react";
import CustomTypography from "../../component/ui/typography/CustomTypography";
import { Box } from "@mui/material";
import { CustomTextField } from "../../component/ui/textField/CustomTextField";
import { CustomButton } from "../../component/ui/button/CustomButton";
import Loading from "../../component/ui/loading/Loading";
import { axiosInstance } from "../../utils/axios";
import { CustomDialogAlarm, CustomDialogError, CustomDialogWarning } from "../../component/ui/dialog/CustomDialog";
import { useRecoilState } from "recoil";
import { userState } from "../../utils/atom";




const UserManager = () => {
  const [userInfo, setUserInfo] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [recoilState, setRecoilState] = useRecoilState(userState);
  const navigate = useNavigate();

  const [warningInfo, setWarningInfo] = useState({
    open: false,
    title: null,
    content: null,
    dialogActionAccept: null,
    dialogActionCancle: null
  });
  const [alarmInfo, setAlarmInfo] = useState({
    open: false,
    title: null,
    content: null,
    dialogAction: null
  });
  const [errorInfo, setErrorInfo] = useState({
    open: false,
    title: null,
    content: null,
    dialogAction: null
  })

  useEffect(()=>{
    if(recoilState.isLoggedIn && recoilState.role){
      if(!recoilState.isLoggedIn || recoilState.role !== 'ADMIN'){
        console.log(recoilState.isLoggedIn, recoilState.role);
        navigate('/');
      }
    } 
  }, [recoilState]);

  

  const onClickDisableAccount = (e) => {
    e.preventDefault();

    const disableUser = async () =>{

      setWarningInfo({
        ...warningInfo,
        open: false});

      setLoading(true);
      try{
        await axiosInstance.put(`/users/disable/${userInfo.get('nickname')}`);

        userInfo.set('disable', 'T');

        const dialogAction = () => {
          setAlarmInfo({
            ...alarmInfo,
            open: false})
        }

        setAlarmInfo({
          open: true,
          title: '계정 비활성화 완료',
          content: '계정을 정상적으로 비활성화 했습니다.',
          dialogAction: dialogAction
        });

      } catch(exception){

        const dialogAction = () => {
          setErrorInfo({
            ...errorInfo,
            open: false})
          }

        setErrorInfo({
          open: true,
          title: '계정 비활성화 실패',
          content: '계정 비활성화에 실패했습니다.',
          dialogAction: dialogAction
        });

        console.log(exception);
      }

      setLoading(false);
    }

    const dialogActionCancle = () => {setWarningInfo({
      ...warningInfo,
      open: false})}

    setWarningInfo({
      open: true,
      title: '계정 비활성화 경고',
      content: '정말로 해당 계정을 비활성화 하시겠습니까?\n(계정은 다시 활성화 할 수 있습니다.)',
      dialogActionAccept: disableUser,
      dialogActionCancle: dialogActionCancle
    });
  } 

  const onClickEnable = (e) => {
    e.preventDefault();

    const enableUser = async () => {

      setWarningInfo({
        ...warningInfo,
        open: false});

      setLoading(true);
      try{
        await axiosInstance.put(`/users/enable/${userInfo.get('nickname')}`);

        const dialogAction = () => {
          setAlarmInfo({
            ...alarmInfo,
            open: false})
          }

        setAlarmInfo({
          open: true,
          title: '계정 활성화 완료',
          content: '계정을 정상적으로 활성화 했습니다.',
          dialogAction: dialogAction
        });

        userInfo.set('disable', 'null');

      } catch(exception){

        const dialogAction = () => {
          setAlarmInfo({
            ...alarmInfo,
            open: false})
          }

        setErrorInfo({
          open: true,
          title: '계정 활성화 실패',
          content: '계정 활성화에 실패했습니다.',
          dialogAction: dialogAction
        });

        console.log(exception);
      }

      setLoading(false);
    }

    const dialogActionCancle = () => {
      setWarningInfo({
        ...warningInfo,
        open: false})
      }

    setWarningInfo({
      open: true,
      title: '계정 활성화 경고',
      content: '정말로 해당 계정을 활성화 하시겠습니까?\n(계정은 다시 비활성화 할 수 있습니다.)',
      dialogActionAccept: enableUser,
      dialogActionCancle: dialogActionCancle
    });
  }

  return(
    <Contents>
      <CustomBox>
        <Box sx={{padding: '10px'}}>
          <CustomTypography variant='h5'>
            회원 정보
          </CustomTypography>
        </Box>        
      </CustomBox>

      <CustomBox>
        <Box sx={{padding: '10px'}}>
          <CustomTypography sx={{margin: '0px 0px 15px 5px'}}>이메일</CustomTypography>
          <CustomTextField disabled value={userInfo.get('email')}/>

          <CustomTypography sx={{margin: '30px 0px 15px 5px'}}>별명</CustomTypography>
          <CustomTextField disabled value={userInfo.get('nickname')}/>

          <CustomTypography sx={{margin: '30px 0px 15px 5px'}}>권한</CustomTypography>
          <CustomTextField disabled value={userInfo.get('role')}/>

          <CustomTypography sx={{margin: '30px 0px 15px 5px'}}>상태</CustomTypography>
          <CustomTextField disabled value={userInfo.get('disabled') === 'T' ? '비활성화' : '활성화'}/>

          <CustomTypography sx={{margin: '30px 0px 15px 5px'}}>가입 날짜</CustomTypography>
          <CustomTextField disabled value={userInfo.get('createdAt')}/>
        </Box>    

        <Box sx={{padding: '10px', textAlign: 'right'}}>
            {userInfo.get('disable') === 'T' ? 
              <CustomButton onClick={onClickEnable}>계정 활성화</CustomButton> : 
              <CustomButton onClick={onClickDisableAccount}>계정 비활성화</CustomButton>}
        </Box>    
      </CustomBox>

      <CustomDialogWarning open={warningInfo.open} title={warningInfo.title} content={warningInfo.content} dialogActionAccept={warningInfo.dialogActionAccept} dialogActionCancle={warningInfo.dialogActionCancle}/>
      <CustomDialogAlarm open={alarmInfo.open} title={alarmInfo.title} content={alarmInfo.content} dialogAction={alarmInfo.dialogAction}/>
      <CustomDialogError open={errorInfo.open} title={errorInfo.title} content={errorInfo.content} dialogAction={errorInfo.dialogAction}/>
      <Loading open={loading}/>
    </Contents>
  )
}

export default UserManager;
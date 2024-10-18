import { Box } from "@mui/material";
import Contents from "../../component/Contents"
import { CustomBox } from "../../component/ui/box/CustomBox";
import CustomTypography from "../../component/ui/typography/CustomTypography";
import { CustomTextField } from "../../component/ui/textField/CustomTextField";
import { CustomButton } from "../../component/ui/button/CustomButton";
import { useEffect, useRef, useState } from "react";
import Loading from "../../component/ui/loading/Loading";
import { CustomDialogError } from "../../component/ui/dialog/CustomDialog";
import { load } from "react-cookies";
import { axiosInstance } from "../../utils/axios";
import { useRecoilState } from "recoil";
import { userState } from "../../utils/atom";


const MyPage = () => {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [recoilState, setRecoilState] = useRecoilState(userState);
  const [errorInfo, setErrorInfo] = useState({
    open: false,
    title: null,
    content: null,
    dialogAction: null
  });

  useEffect(()=>{
    setLoading(true);

    const getUserInfo = async() => {
      try{
        const response = await axiosInstance.get(`/users/email`);
        
        setEmail(response.data);
      } catch(exception){
        console.log(exception);
      }
    }

    getUserInfo();

    setLoading(false);
  }, []);


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

  const UserInfo = ({tag, name, value, modifiable}) => {

    const [disable, setDisable] = useState(false);
    const inputRef = useRef();

    const onClickModifyCancleButton = (e) => {
      e.preventDefault();

      setDisable(false);
    }


    const onClickModifyButton = (e) => {
      e.preventDefault();

      console.log(inputRef.current?.value);
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
            <CustomTextField value={value} disabled/>}
      </Box>
        
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
        <UserInfo tag={'email'} name={'이메일'} value={email} />
        <UserInfo tag={'nickname'} name={'별명'} value={recoilState.nickname} modifiable={true}/>
        <UserInfo tag={'password'} name={'비밀번호 변경'} modifiable={true}/>
        <UserInfo tag={'password-check'} name={'비밀번호 변경 확인'} modifiable={true}/>
      </CustomBox>
      <CustomDialogError open={errorInfo.open}/>
      <Loading open={loading}/>
    </Contents>
  )
}

export default MyPage;
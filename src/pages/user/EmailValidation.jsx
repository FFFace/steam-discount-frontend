import { useLocation } from "react-router-dom";
import Contants from "../../component/Contants";
import { CustomBox } from "../../component/ui/box/CustomBox";
import { CustomButtonWhite } from "../../component/ui/button/CustomButton";
import { CustomTextField } from "../../component/ui/textField/CustomTextField";
import CustomTypography from "../../component/ui/typography/CustomTypography";
import { axiosInstance } from "../../utils/axios";
import { useState } from "react";


const EmailValidation = () => {

  const location = useLocation();
  const verifyEmail = location.state.email;
  const [verifyCode, setVerifyCode] = useState('');

  const onClickVerify = async () => {
    console.log(verifyEmail, verifyCode);
    try{
      const response = await axiosInstance.post('/users/verify', {
        email: verifyEmail,
        code: verifyCode,
      }
    );

    if(response.data){
      

      navigator('/login');
    } else {

    }

    } catch (exception){ 
      console.log(exception);
    }
  }

  const onChangeCode = (e) => {
    setVerifyCode(e.target.value);
  } 

  return (
    <Contants>
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
    </Contants>
  );
};


export default EmailValidation;
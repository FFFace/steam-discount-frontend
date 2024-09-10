import Contants from "../../component/Contants";
import { CustomBox } from "../../component/ui/box/CustomBox";
import { CustomButtonWhite } from "../../component/ui/button/CustomButton";
import { CustomTextField } from "../../component/ui/textField/CustomTextField";
import CustomTypography from "../../component/ui/typography/CustomTypography";


const EmailValidation = () => {
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
        <CustomTextField/>
        <CustomButtonWhite>인증</CustomButtonWhite>
      </CustomBox>
    </Contants>
  );
};


export default EmailValidation;
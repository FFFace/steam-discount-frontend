import Contants from "../../component/Contants";
import { CustomBox } from "../../component/ui/box/CustomBox";
import { CustomButton, CustomButtonWhite } from "../../component/ui/button/CustomButton";
import { CustomTextField } from "../../component/ui/textField/CustomTextField";
import CustomTypography from "../../component/ui/typography/CustomTypography";



const UserRegister = () => {
  return (
    <Contants>
      <CustomBox>
        <CustomTypography variant='h5'>
          회원 가입
        </CustomTypography>
      </CustomBox>
      <CustomBox>
        <CustomTypography sx={{margin: '0px 15px 0px auto', display: 'inline'}}>이메일</CustomTypography>
        <CustomButtonWhite size='small' sx={{color: 'var(--color1)', backgroundColor: 'var(--color3)', ":hover": {boardColor: 'var(--color1)'}}}>중복검사</CustomButtonWhite>
        <CustomTextField/>

        <CustomTypography>비밀번호</CustomTypography>
        <CustomTextField/>

        <CustomTypography>비밀번호 확인</CustomTypography>
        <CustomTextField/>

        <CustomTypography sx={{margin: '0px 15px 0px auto', display: 'inline'}}>별명</CustomTypography>
        <CustomButtonWhite size='small' sx={{color: 'var(--color1)', backgroundColor: 'var(--color3)', ":hover": {boardColor: 'var(--color1)'}}}>중복검사</CustomButtonWhite>
        <CustomTextField/>

        <CustomButtonWhite>
          회원가입
        </CustomButtonWhite>
      </CustomBox>
    </Contants>
  );
};



export default UserRegister;
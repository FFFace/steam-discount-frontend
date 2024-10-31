import { Box, Tab, Tabs } from "@mui/material";
import Contents from "../../component/Contents"
import { CustomBox } from "../../component/ui/box/CustomBox"
import CustomTypography from "../../component/ui/typography/CustomTypography";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import Loading from "../../component/ui/loading/Loading";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../utils/atom";

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

export const UserListTypographyNickname = ({children}) => {
  return (
    <CustomTypography sx={{margin: '0px 0px 0px 5px', display: 'inline-block', width: '20%', textAlign: 'left', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
      {children}
    </CustomTypography>
  )
}

export const UserListTypographyRole = ({children}) => {
  return (
    <CustomTypography sx={{display: 'inline-block', width: '20%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', textAlign: 'center'}}>
      {children}
    </CustomTypography>
  )    
}

export const UserListTypographyCreatedAt = ({children}) => {
  return (
    <CustomTypography sx={{display: 'inline-block', width: '30%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', textAlign: 'center'}}>
      {children}
    </CustomTypography>
  )   
}

export const UserListTypographyDiable = ({children}) => {
  return(
    <CustomTypography sx={{display: 'inline-block', width: '25%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', textAlign: 'center'}}>
      {children}
    </CustomTypography>
  )
}

const AdminPage = () => {

  const [recoilState, setRecoilState] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [userList, setUserList] = useState(null);
  const [boardList, setBoardList] = useState(null);
  const [postList, setPostList] = useState(null);

  const navigate = useNavigate();

  if(!recoilState.isLoggedIn || recoilState?.role !== 'ADMIN') {
    navigate('/');
  }

  const getUserList = async () => {
    setLoading(true);

    try{
      const response = await axiosInstance('/users/all');

      setUserList(response.data);

    } catch(exception){
      console.log(exception);
    }

    setLoading(false);
  }

  useEffect(() => {
    getUserList();
  }, []);

  const changeTabpHandle = (e, value) => {
    e.preventDefault();

    setTabValue(value);
  }

  const onClickUserLink = (e, user) => {
    e.preventDefault();

    window.open(`/user-info?email=${user.email}&nickname=${user.nickname}&role=${user.role}&disable=${user.disable}&createdAt=${user.createdAt}`, '_blank', 'noopener,noreferrer');
  }

  const UserList = () => {
    return userList.map(user => (
      <Box key={user.nickname} sx={{padding: '3px 0px 3px 3px', margin: '10px 0px 10px 0px', border: 'solid 1px var(--color3)'}}>
        <Link onClick={(e) => onClickUserLink(e, user)}> 
          <UserListTypographyNickname>{user.nickname}</UserListTypographyNickname>
          <UserListTypographyRole>{user.role}</UserListTypographyRole>
          <UserListTypographyDiable>{user.disable === 'T' ? '비활성화' : '활성화'}</UserListTypographyDiable>
          <UserListTypographyCreatedAt>{user.createdAt}</UserListTypographyCreatedAt>
        </Link>
      </Box>
      
    ));
  }

  return (
    <Contents>
      <CustomBox>
        <Box sx={{padding: '10px'}}>
          <CustomTypography variant='h5'>
            관리자 페이지
          </CustomTypography>
        </Box>
      </CustomBox>

      <CustomBox>
        <Tabs value={tabValue} onChange={changeTabpHandle} sx={{'& .MuiTabs-indicator': {
          backgroundColor: 'var(--color4)'
        }}}>
            <Tab label='회원 목록' sx={{color: 'var(--color3)', '&.Mui-selected': {
              color: 'var(--color4)'
            }}}/>
            <Tab label='게시판 목록'sx={{color: 'var(--color3)', '&.Mui-selected': {
              color: 'var(--color4)'
            }}}/>
            <Tab label='게시글 목록'sx={{color: 'var(--color3)', '&.Mui-selected': {
              color: 'var(--color4)'
            }}}/>
          </Tabs>
      </CustomBox>

      <CustomBox>
        <Box sx={{padding: '10px'}}>
          <UserListTypographyNickname>별명</UserListTypographyNickname>
          <UserListTypographyRole>권한</UserListTypographyRole>
          <UserListTypographyDiable>상태</UserListTypographyDiable>
          <UserListTypographyCreatedAt>가입 날짜</UserListTypographyCreatedAt>
        </Box>
        
      </CustomBox>

      <CustomBox>
        <CustomTabPanel value={tabValue} index={0}>
          {userList && <UserList/>}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          게시판 목록
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          게시글 목록
        </CustomTabPanel>
      </CustomBox> 
      <Loading open={loading}/>
    </Contents>
  )
}

export default AdminPage;
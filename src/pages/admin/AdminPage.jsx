import { Box, Tab, Tabs } from "@mui/material";
import Contents from "../../component/Contents"
import { CustomBox } from "../../component/ui/box/CustomBox"
import CustomTypography from "../../component/ui/typography/CustomTypography";
import { useEffect, useState } from "react";




const AdminPage = () => {

  const [tabValue, setTabValue] = useState(0);
  const [userList, setUserList] = useState(null);
  const [boardList, setBoardList] = useState(null);
  const [postList, setPostList] = useState(null);

  useEffect(() => {

  }, []);

  const changeTabpHandle = (e, value) => {
    e.preventDefault();

    setTabValue(value);
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
        <Tabs value={tabValue} onChange={changeTabpHandle}>
            <Tab label='회원 목록'/>
            <Tab label='게시판 목록'/>
            <Tab label='게시글 목록'/>
          </Tabs>
      </CustomBox> 
    </Contents>
  )
}

export default AdminPage;
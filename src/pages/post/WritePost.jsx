import { useLocation } from "react-router-dom"
import Contents from "../../component/Contents"
import { CustomBox } from "../../component/ui/box/CustomBox"
import { useRef, useState } from "react";
import { Box, TextField } from "@mui/material";
import CustomTypography from "../../component/ui/typography/CustomTypography";
import { CustomTextField } from "../../component/ui/textField/CustomTextField";
import { Editor } from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { isMobile } from "react-device-detect";
import { CustomButton, CustomButtonWhite } from "../../component/ui/button/CustomButton";
import { axiosInstance } from "../../utils/axios";


const WritePost = () => {

  const location = useLocation();
  const board = location.state?.board;

  const editorRef = useRef();
  const postNameRef = useRef();

  const PCEditor = () => {
    return(
      <Editor 
         placeholder="내용을 입력해 주세요."
         previewStyle="tab"
         initialEditType="wysiwyg"
         language='ko-KR' 
         height='500px' 
         theme='dark'
         hideModeSwitch='true'
         ref={editorRef}
         toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['ul', 'ol'],
          ['image', 'link']
         ]}/>
    )
  }

  const MobileEditor = () => {
    return(
      <Editor 
         placeholder="내용을 입력해 주세요."
         previewStyle="tab"
         initialEditType="wysiwyg"
         language='ko-KR' 
         height='500px' 
         theme='dark'
         hideModeSwitch='true'
         autofocus={false}
         ref={editorRef}
         useCommandShortcut={false}
         toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['ul', 'ol'],
         ]}/>
    )
  }

  const onClickWritePostButton = async () => {
    try{
      await axiosInstance.post(`/posts`, {
        boardId: board.id,
        name: postNameRef.current?.value,
        content: editorRef.current?.getInstance().getMarkdown()
      });
    } catch(exception){
      console.log(exception);
    }
  }

  return(
    <Contents>
      <CustomBox>
        <Box sx={{padding: '10px'}}>
          <CustomTypography variant='h5'>
            {board.name}
          </CustomTypography>
        </Box>
      </CustomBox>

      <CustomBox>
        <CustomTextField name='name' placeholder="제목을 입력해 주세요." inputRef={postNameRef}/>
          
        {isMobile ? <MobileEditor/> : <PCEditor/>}

        <Box sx={{margin: '10px 0px'}}>
          <CustomButtonWhite onClick={onClickWritePostButton}>
            글 작성
          </CustomButtonWhite>
        </Box>
      </CustomBox>
    </Contents>
  )
}

export default WritePost;
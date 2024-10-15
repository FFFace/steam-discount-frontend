import { useLocation, useSearchParams } from "react-router-dom"
import Contents from "../../component/Contents"
import { CustomBox } from "../../component/ui/box/CustomBox"
import { useEffect, useRef, useState } from "react";
import { Box, TextField } from "@mui/material";
import CustomTypography from "../../component/ui/typography/CustomTypography";
import { CustomTextField } from "../../component/ui/textField/CustomTextField";
import { Editor } from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { isMobile } from "react-device-detect";
import { CustomButton, CustomButtonWhite } from "../../component/ui/button/CustomButton";
import { axiosInstance } from "../../utils/axios";
import { TrySharp } from "@mui/icons-material";
import Loading from "../../component/ui/loading/Loading";
import { useRecoilState } from "recoil";
import { userState } from "../../utils/atom";


const WritePost = () => {

  const location = useLocation();
  const board = location.state?.board;
  const postInfo = location.state?.postInfo;

  const [recoilState, setRecoilState] = useRecoilState(userState);

  const editorRef = useRef();
  const postNameRef = useRef();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try{
        const response = await axiosInstance.get(`/posts/${postInfo?.id}`);
        console.log(response);
      } catch(exception){
        console.log(exception);
      }
    }

    if(postInfo?.updated)
      getPost();
  }, [])

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
         initialValue={postInfo?.content ? postInfo.content : null}
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
    setLoading(true);
    try{
        await axiosInstance.post(`/posts`, {
          boardId: board.id,
          name: postNameRef.current?.value,
          content: editorRef.current?.getInstance().getMarkdown()
        });
    } catch(exception){
      console.log(exception);
    }
    setLoading(false);
    window.open(`/post?board-name=${board?.name}&id=${postInfo?.id}&name=${postInfo?.name}&writer=${recoilState?.nickname}`, 'noopener,noreferrer');
  }

  const onClickUpdatePostButton = async () => {
    setLoading(true);
    try{
      await axiosInstance.put(`/posts/${postInfo.id}`, {
        boardId: board.id,
        name: postNameRef.current?.value,
        content: editorRef.current?.getInstance().getMarkdown()
      });
    } catch(exception){
      console.log(exception);
    }
    setLoading(false);
    window.open(`/post?board-name=${board?.name}&id=${postInfo?.id}&name=${postInfo?.name}&writer=${recoilState?.nickname}`, 'noopener,noreferrer');
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
        <CustomTextField name='name' placeholder="제목을 입력해 주세요." inputRef={postNameRef} defaultValue={postInfo?.name ? postInfo.name : null}/>
          
        {isMobile ? <MobileEditor/> : <PCEditor/>}

        <Box sx={{margin: '10px 0px'}}>
          {postInfo?.id ? <CustomButtonWhite onClick={onClickUpdatePostButton}>글 수정</CustomButtonWhite> :
            <CustomButtonWhite onClick={onClickWritePostButton}>글 쓰기</CustomButtonWhite>}
          
        </Box>
      </CustomBox>
      <Loading open={loading}/>
    </Contents>
  )
}

export default WritePost;
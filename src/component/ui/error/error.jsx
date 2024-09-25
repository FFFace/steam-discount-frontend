import { DialogActions } from "@mui/material";
import { CustomDialog, CustomDialogContent, CustomDialogErrorTitle } from "../dialog/CustomDialog";
import { CustomButton } from "../button/CustomButton";
import { useState } from "react";

export const LoginFailed = ({loginFailedOpen, loginFailedDialogAccept}) => {
  return(
    <CustomDialog open={loginFailedOpen}>
      <CustomDialogErrorTitle>로그인 실패</CustomDialogErrorTitle>
      <CustomDialogContent>
        로그인에 실패했습니다.<br/>
        이메일 또는 비밀번호를 확인해주세요.<br/>
      </CustomDialogContent>
      <DialogActions>
        <CustomButton onClick={loginFailedDialogAccept}>확인</CustomButton>
      </DialogActions>
    </CustomDialog>
  );
}

export const NeedDuplicateEmail = ({needDuplicateOpen, needDuplicateDialogAccept}) => {
  return(
    <CustomDialog open={needDuplicateOpen}>
      <CustomDialogErrorTitle>인증 대기중인 이메일</CustomDialogErrorTitle>
      <CustomDialogContent>
        인증 대기중인 이메일 입니다.<br/>
        이메일 인증 페이지로 이동합니다.<br/>
      </CustomDialogContent>
      <DialogActions>
        <CustomButton onClick={needDuplicateDialogAccept}>확인</CustomButton>
      </DialogActions>
    </CustomDialog>
  )
}
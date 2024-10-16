import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { CustomButton } from "../button/CustomButton";


export const CustomDialog = (props) => {
  return(
    <Dialog sx={{'& .MuiPaper-root': {
      backgroundColor: 'var(--color1)'
    }}} {...props} >{props.children}</Dialog>
  );
}

export const CustomDialogTitle = (props) => {
  return(
    <DialogTitle sx={{color: 'var(--color4)'}} {...props}>{props.children}</DialogTitle>
  )
}

export const CustomDialogErrorTitle = (props) => {
  return(
    <DialogTitle sx={{color: 'red'}} {...props}>{props.children}</DialogTitle>
  )
}

export const CustomDialogContent = (props) => {
  return(
    <DialogContent sx={{color: 'var(--color4)'}} {...props}>{props.children}</DialogContent>
  );
}

export const ErrorNeedLogin = ({open, dialogAction}) => {
  return(
    <CustomDialog open={open}>
      <CustomDialogErrorTitle>
        권한 없음
      </CustomDialogErrorTitle>
      <CustomDialogContent>
        현재 로그인 상태가 아닙니다.<br/>
        로그인 후 다시 이용해 주세요.
      </CustomDialogContent>
      <DialogActions>
        <CustomButton onClick={dialogAction}>
          확인
        </CustomButton>
      </DialogActions>
    </CustomDialog>
  )
}
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
    <DialogContent sx={{color: 'var(--color4)', whiteSpace: 'pre-line'}} {...props}>{props.children}</DialogContent>
  );
}

export const CustomDialogError = ({open, dialogAction, title, content}) => {
  return(
    <CustomDialog open={open}>
      <CustomDialogErrorTitle>
        {title}
      </CustomDialogErrorTitle>
      <CustomDialogContent>
        {content}
      </CustomDialogContent>
      <DialogActions>
        <CustomButton onClick={dialogAction}>
          확인
        </CustomButton>
      </DialogActions>
    </CustomDialog>
  )
}
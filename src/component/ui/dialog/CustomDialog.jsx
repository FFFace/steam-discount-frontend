import { Dialog, DialogContent, DialogTitle } from "@mui/material";


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

export const CustomDialogContent = (props) => {
  return(
    <DialogContent sx={{color: 'var(--color4)'}} {...props}>{props.children}</DialogContent>
  );
}
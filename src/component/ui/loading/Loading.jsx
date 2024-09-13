import { Backdrop, CircularProgress } from "@mui/material";





const Loading = ({...props}) => {
  return(
    <Backdrop {...props}>
      <CircularProgress />
    </Backdrop>
  );
}

export default Loading;
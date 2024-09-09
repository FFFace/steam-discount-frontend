import { Typography } from "@mui/material";


const CustomTypography = ({...props}) =>{
  return (
    <Typography color='var(--color4)' {...props}>{props.children}</Typography>
  )
}


export default CustomTypography;
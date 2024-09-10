import { Box } from "@mui/material";



export const CustomBox = ({...props}) => {
  return (
    <Box sx={{margin: '15px', padding: '5px', backgroundColor: 'var(--color2)'}} {...props}>
      {props.children}
    </Box>
  )
}
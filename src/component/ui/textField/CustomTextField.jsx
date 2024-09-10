import { TextField } from "@mui/material";



export const CustomTextField = ({...props}) => {
  return (
    <TextField size="small" sx={{
      margin: '5px 0px 10px 0px',
      display: 'flex',
      ' .MuiOutlinedInput-root': {
        color: 'white',
        border: 'solid 1px var(--color2)',
        backgroundColor: 'black',
        '&.Mui-focused fieldset': {
          border: 'solid 2px gray'
        }
      }
    }} 
    {...props} />
  );
};
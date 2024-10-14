import { TextField } from "@mui/material";



export const CustomTextField = ({...props}) => {
  return (
    <TextField size="small" sx={{
      margin: '5px 0px 10px 0px',
      display: 'flex',
      ' .MuiOutlinedInput-root': {
        color: 'white',
        border: 'solid 1px var(--color1)',
        backgroundColor: 'var(--color1)',
        '&.Mui-focused fieldset': {
          border: 'solid 2px gray'
        }
      }
    }} 
    {...props} />
  );
};

export const CustomTextFieldComment1 = ({...props}) => {
  return (
    <TextField size="small" sx={{
      margin: '5px 0px 10px 0px',
      display: 'flex',
      ' .MuiOutlinedInput-root': {
        color: 'white',
        border: 'solid 1px var(--color1)',
        backgroundColor: 'var(--color1)',
        '&.Mui-focused fieldset': {
          border: 'solid 2px gray'
        }
      }
    }} 
    {...props} />
  );
};

export const CustomTextFieldComment2 = ({...props}) => {
  return (
    <TextField size="small" sx={{
      margin: '5px 0px 10px 0px',
      padding: '0px 0px 0px 10dvw',
      display: 'flex',
      ' .MuiOutlinedInput-root': {
        color: 'white',
        border: 'solid 1px var(--color1)',
        backgroundColor: 'var(--color1)',
        '&.Mui-focused fieldset': {
          border: 'solid 2px gray'
        }
      }
    }} 
    {...props} />
  );
};

export const CustomTextFieldComment3 = ({...props}) => {
  return (
    <TextField size="small" sx={{
      margin: '5px 0px 10px 0px',
      padding: '0px 0px 0px 10dvw',
      display: 'flex',
      ' .MuiOutlinedInput-root': {
        color: 'white',
        border: 'solid 1px var(--color2)',
        backgroundColor: 'var(--color2)',
        '&.Mui-focused fieldset': {
          border: 'solid 2px gray'
        }
      }
    }} 
    {...props} />
  );
};
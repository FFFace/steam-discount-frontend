import { ThemeProvider, Button, createTheme } from "@mui/material";


const CustomButton = ({...props}) => {
  return (
    <Button size='large' onClick={props.onClick} sx={{
        color: 'var(--color4)', 
        ":hover": {
          background: 'var(--color2)'
          }
        }} {...props}>
        {props.children}
    </Button>
  );
};


export default CustomButton;
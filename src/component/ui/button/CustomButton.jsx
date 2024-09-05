import { ThemeProvider, Button, createTheme } from "@mui/material";


const CustomButton = ({children}) => {
  return (
    <Button size='large' 
      sx={{
        color: 'var(--color4)',
        ":hover": {background: 'var(--color2)'}
        }}>
        {children}
    </Button>
  );
};


export default CustomButton;
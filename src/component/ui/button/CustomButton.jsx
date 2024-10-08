import { ThemeProvider, Button, createTheme } from "@mui/material";


export const CustomButton = ({...props}) => {
  return (
    <Button size='large' sx={{color: 'var(--color4)', ":hover": {background: 'var(--color2)'}}} {...props}>
        {props.children}
    </Button>
  );
};

export const CustomButtonWhite = ({...props}) => {
  return (
    <CustomButton sx={{margin: '10px 0px auto', width: '100%', color: 'var(--color1)', fontWeight: 'bold', backgroundColor: 'var(--color3)', ":hover": {boardColor: 'var(--color1)'}}} {...props}>
      {props.children}
    </CustomButton>
  );
};
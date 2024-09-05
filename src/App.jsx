import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import Contants from './component/Contants';
import { Button, ThemeProvider, Typography, createTheme } from '@mui/material';


function App() {
  return (
      <Contants>  
        <Typography>
          MUI Body
        </Typography>
        <Typography>
          MUI Body1
        </Typography>
        <Typography>
          MUI Body2
        </Typography>
      </Contants>
  );
}

export default App;

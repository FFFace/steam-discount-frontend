import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import Contants from './component/Contants';
import { Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { userState } from './utils/atom';
import { axiosInstance } from './utils/axios';
import { useEffect } from 'react';
import { saveAccessToken } from './utils/storage';


function App() {

  const [state, setState] = useRecoilState(userState);

  useEffect(() => {
    const pageOpen = async () => {
      try{
        const response = await axiosInstance.get(`/token-check`)
  
        saveAccessToken(response.headers['authorization']);
        setState({
          ...state,
          isLoggedIn: true
        });
      } catch(exception){
        console.log(exception);

        setState({
          ...state,
          isLoggedIn: false
        });
      }
    }

    pageOpen();
  }, []);

  return (
    <Contants>  
      <Typography>
        MUI Body
      </Typography>  
    </Contants>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import Contents from './component/Contents';
import { Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { userState } from './utils/atom';
import { axiosInstance } from './utils/axios';
import { useEffect } from 'react';
import { saveAccessToken } from './utils/storage';


function App() {

  return (
    <Contents>  
      <Typography>
        MUI Body
      </Typography>  
    </Contents>
  );
}

export default App;

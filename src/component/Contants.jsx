import { Box } from "@mui/material";
import styled from 'styled-components';
import Header from "./Header";
import Footer from "./Footer";

const Contants = ({children}) =>{
  return(
    <Container>
      <Header/>
      <Box>{children}</Box>
      <Footer/>
    </Container>
  )
}

const Container = styled.div`
  width: 600px;
  height: 1000px;
  margin: 0 auto;
  border: solid 1px var(--color2)
`

export default Contants;
import { Box } from "@mui/material";
import styled from 'styled-components';
import Header from "./Header";
import Footer from "./Footer";

const Contents = ({children}) =>{

  return(
    <Container>
      <Header/>
      <Box>{children}</Box>
      <Footer/>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  max-width: 700px;
  height: 100vhx;
  margin: 0 auto;
  border: solid 1px var(--color2)
`

export default Contents;
import { useEffect, useState } from "react"
import Contants from "../../component/Contants"
import { CustomBox } from "../../component/ui/box/CustomBox"
import CustomTypography from "../../component/ui/typography/CustomTypography"
import { useLocation } from "react-router-dom"




const Post = () => {

  const location = useLocation();
  const post = location.state?.postDetail;
  const [contant, setContant] = useState(null);
  const [comments, setComments] = useState(null);

  console.log(post);

  useEffect(()=>{

  }, [])

  return(
    <Contants>
      <CustomBox>
        <CustomTypography variant='h5' sx={{padding: '10px'}}>
          
        </CustomTypography>
      </CustomBox>
    </Contants>
  )
}


export default Post;
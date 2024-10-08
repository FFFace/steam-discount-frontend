import { useEffect } from "react";
import Contents from "../../component/Contents"
import { CustomBox } from "../../component/ui/box/CustomBox";



const PostList = () => {



  useEffect(()=>{
    const getPostList = async() => {
      try{
        
      } catch(exception){
        console.log(exception);
      }
    }
  }, [])

  return(
    <Contents>
      <CustomBox>

      </CustomBox>
    </Contents>
  )
}

export default PostList;
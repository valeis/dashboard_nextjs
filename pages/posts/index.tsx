import { dehydrate, QueryClient } from "react-query";

import PostsPage from "@/components/PostsPage/PostsPage";
import postsRequest from "@/api/posts";
import { GetServerSideProps} from "next/types";
import { getAuth } from "@/utils/getAuth";
;

const Posts=()=> {
    return (<PostsPage/>)
}

export const getServerSideProps:GetServerSideProps = getAuth(async()=>{
   const queryClient = new QueryClient();
   await queryClient.prefetchQuery("posts", postsRequest.get);
   return {
      props: {
         dehydratedState:dehydrate(queryClient)
      }
   }
}) 
export default Posts;
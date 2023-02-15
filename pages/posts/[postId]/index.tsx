import { dehydrate, QueryClient } from "react-query";
import PostDetails from "@/components/PostDetails/PostDetails";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAuth } from "@/utils/getAuth";
import postsRequest from "@/api/posts";

interface IParams extends ParsedUrlQuery{
   postId: string;
}

const PostDetail = () => {
 return(
    <PostDetails/>
 )
};

export const getServerSideProps: GetServerSideProps = getAuth(async(context)=>{
   const { postId } = context!.params as IParams
   const queryClient = new QueryClient();
   await queryClient.prefetchQuery(["posts", postId], ()=>postsRequest.getById(postId));
   return {
      props: {
         dehydratedState: dehydrate(queryClient)
      }
   }
})  
   
export default PostDetail;
import { dehydrate, QueryClient } from "react-query";
import { useRouter } from "next/router";

import usersRequest from "@/api/users";
import PostDetails from "@/components/PostDetails/PostDetails";
import withAuth from "@/HOC/withAuth";
import postsRequest from "@/api/posts";


const PostDetail = () => {
 return(
    <PostDetails />
 )
};

export async function getStaticPaths() {
   return {
     paths: [{ params: {postId: '4'} }],
     fallback: true, 
   }
 }

export async function getStaticProps(context:any) { 
   const postId = context.query;
   const queryClient = new QueryClient();
   await queryClient.prefetchQuery(["posts", postId], ()=>postsRequest.getById(postId));
   return {
      props:{
         dehydratedState: dehydrate(queryClient),
      }
   }
}

export default withAuth(PostDetail, false);
import { dehydrate, QueryClient } from "react-query";
import { useRouter } from "next/router";

import usersRequest from "@/api/users";
import PostDetails from "@/components/PostDetails/PostDetails";
import withAuth from "@/HOC/withAuth";
import postsRequest from "@/api/posts";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface IParams extends ParsedUrlQuery{
   postId: string;
}

const PostDetail = () => {
 return(
    <PostDetails />
 )
};

export async function getStaticPaths() {
   return {
     paths: [{ params: {postId: '4'} }],
     fallback: 'blocking'
   }
 }

export const getStaticProps: GetStaticProps = async(context) => { 
   const { postId } = context.params as IParams
   const queryClient = new QueryClient();
   await queryClient.prefetchQuery(["posts", postId], ()=>postsRequest.getById(postId));
   return {
      props:{
         dehydratedState: dehydrate(queryClient),
      }
   }
}



export default withAuth(PostDetail, false);
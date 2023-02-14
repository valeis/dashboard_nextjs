import { dehydrate, QueryClient } from "react-query";
import { useRouter } from "next/router";

import usersRequest from "@/api/users";
import PostDetails from "@/components/PostDetails/PostDetails";
import withAuth from "@/HOC/withAuth";
import postsRequest from "@/api/posts";
import { GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { Card } from "@/types/Card";

interface IParams extends ParsedUrlQuery{
   postId: string;
}

interface PostsPageProps {
   postsData: Card
}

const PostDetail: NextPage<PostsPageProps> = ({postsData}) => {
 return(
    <PostDetails {...postsData}/>
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
   const postsData = await queryClient.fetchQuery(["posts", postId], ()=>postsRequest.getById(postId));
   return {
      props:{
         postsData,
         dehydratedState: dehydrate(queryClient),
      }
   }
}


export default PostDetail;
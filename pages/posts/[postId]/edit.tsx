import postsRequest from "@/api/posts";
import CreatePosts from "@/components/CreatePost/CreatePosts";
import withAuth from "@/HOC/withAuth";
import { query } from "express";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { dehydrate, QueryClient } from "react-query";

interface IParams extends ParsedUrlQuery{
  postId: string;
}

const EditPost = () => {
  return <CreatePosts />;
};

export async function getStaticPaths() {
  return {
    paths: [{ params: {postId: '4'}}],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async(context) => {
  const { postId } = context.params as IParams
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["posts", postId], ()=> postsRequest.getById(postId));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    }
  }
}

export default EditPost;

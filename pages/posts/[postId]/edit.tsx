import { GetServerSideProps} from "next";
import { ParsedUrlQuery } from "querystring";
import { dehydrate, QueryClient } from "react-query";

import { getAuth } from "@/utils/getAuth";
import CreatePosts from "@/components/CreatePost/CreatePosts";
import postsRequest from "@/api/posts";

interface IParams extends ParsedUrlQuery{
  postId: string;
}

const EditPost= () => {
  return <CreatePosts />;
};

export const getServerSideProps: GetServerSideProps = getAuth(async(context) => {
  const { postId } = context!.params as IParams
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["posts", postId], ()=> postsRequest.getById(postId));
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
})

export default EditPost;

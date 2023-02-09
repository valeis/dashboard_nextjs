import { dehydrate, QueryClient } from "react-query";

import PostsPage from "@/components/PostsPage/PostsPage";
import withAuth from "@/HOC/withAuth";
import postsRequest from "@/api/posts";
import { GetStaticProps } from "next/types";
;

const Posts=()=> {
    return (<PostsPage/>)
}

export const getStaticProps:GetStaticProps = async() => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery("posts", postsRequest.get);
    return {
       props: {
          dehydratedState: dehydrate(queryClient)
       },
    }
 }

export default withAuth(Posts, false);
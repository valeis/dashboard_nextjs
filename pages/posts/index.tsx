import PostsPage from "@/components/PostsPage/PostsPage";
import withAuth from "@/HOC/withAuth";

const Posts=()=> {
    return (<PostsPage/>)
}

export default withAuth(Posts);
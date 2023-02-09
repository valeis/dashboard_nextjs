import PostDetails from "@/components/PostDetails/PostDetails";
import withAuth from "@/HOC/withAuth";

const PostDetail = () => {
 return(
    <PostDetails />
 )
}

export default withAuth(PostDetail);
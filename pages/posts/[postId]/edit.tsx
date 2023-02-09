import CreatePosts from "@/components/CreatePost/CreatePosts";
import withAuth from "@/HOC/withAuth";

const EditPost = () => {
  return <CreatePosts />;
};

export default withAuth(EditPost, false);

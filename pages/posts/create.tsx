import CreatePosts from "@/components/CreatePost/CreatePosts";
import withAuth from "@/HOC/withAuth";

const CreatePost = () => {
  return <CreatePosts />;
};

export default withAuth(CreatePost, false);

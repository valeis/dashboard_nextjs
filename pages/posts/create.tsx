import CreatePosts from "@/components/CreatePost/CreatePosts";
import withAuth from "@/HOC/withAuth";
import { getAuth } from "@/utils/getAuth";
import { GetServerSideProps } from "next";

const CreatePost = () => {
  return <CreatePosts />;
};

export const getServerSideProps:GetServerSideProps = getAuth(async()=>{})

export default CreatePost;

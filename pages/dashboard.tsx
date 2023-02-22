import postsRequest from "@/api/posts";
import usersRequest from "@/api/users";
import LineRechartComponent from "@/components/Chart/Chart";
import withAuth from "@/HOC/withAuth";
import { User } from "@/types/User";
import { getAuth } from "@/utils/getAuth";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { redirect } from "next/dist/server/api-utils";
import { dehydrate, QueryClient } from "react-query";

const Dashboard = () => {
  return (
    <>
      <h1 className="title_dashboard">Statistica postărilor</h1>
      <LineRechartComponent />
    </>
  );
};


export const getServerSideProps:GetServerSideProps = getAuth(async()=>{
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("posts", postsRequest.getAll);
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    },
  }
}) 

export default Dashboard;

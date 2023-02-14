import postsRequest from "@/api/posts";
import LineRechartComponent from "@/components/Chart/Chart";
import withAuth from "@/HOC/withAuth";
import { User } from "@/types/User";
import { dehydrate, QueryClient } from "react-query";

interface UsersPageProps {
  users: User[]
}

const Dashboard = () => {
  return (
    <>
      <h1 className="title_dashboard">Statistica postărilor</h1>
      <LineRechartComponent />
    </>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("posts", postsRequest.get);
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    },
  }
}

export default Dashboard;


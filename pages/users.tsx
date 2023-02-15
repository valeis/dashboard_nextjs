import { dehydrate, QueryClient } from "react-query";
import { GetServerSideProps, NextPage } from "next";

import Users from "@/components/UsersTable/UsersTable";
import usersRequest from "@/api/users";
import { User } from "@/types/User";
import { getAuth } from "@/utils/getAuth";


interface UsersPageProps {
  users: User[]
}

const UsersPage: NextPage<UsersPageProps> = () => {
  return <Users />;
};

export const getServerSideProps:GetServerSideProps = getAuth(async()=>{
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("users", usersRequest.get);
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}) 


export default UsersPage;

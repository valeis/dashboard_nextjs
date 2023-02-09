import { use, useContext } from "react";
import { dehydrate, QueryClient } from "react-query";
import { NextPage } from "next";

import withAuth from "@/HOC/withAuth";
import Users from "@/components/UsersTable/UsersTable";
import AuthContext from "@/store/auth-context";
import usersRequest from "@/api/users";
import { User } from "@/types/User";


interface UsersPageProps {
  users: User[]
}

const UsersPage: NextPage<UsersPageProps> = () => {
  return <Users />;
};

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("users", usersRequest.get);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default withAuth(UsersPage, false);
//export default UsersPage

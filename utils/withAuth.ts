import AuthContext from "@/store/auth-context";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const withAuth = (Component:any) => {
  const AuthenticatedComponent = () => {
    const { isLoading, isLoggedIn } = useContext(AuthContext);

    const router = useRouter();
    useEffect(() => {
      const getUser = async () => {
        if (!isLoggedIn) {
          router.push("./login");
        }
      };
      getUser();
    }, []);
    //return <Component/>;
  };
    return AuthenticatedComponent;
};

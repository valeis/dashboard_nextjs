import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import AuthContext from "@/store/auth-context";
import { User } from "@/types/User";
import { NextComponentType, NextPage } from "next";
import Users from "@/components/UsersTable/UsersTable";


const withAuth = <T extends object>(Component:React.ComponentType<T>, isAuth=false,) =>{
  const AuthenticatedComponent = (props:T) => {
    const { isLoading, isLoggedIn } = useContext(AuthContext);

    const router = useRouter();

    useEffect(() => {
      const getUser = async () => {
        if (!isLoggedIn && !isAuth) {
          router.push("./login")
        } else if(isLoggedIn && isAuth) {
          router.push("./dashboard")
        }
      };
      getUser();
    }, [isLoggedIn, router]);
    return ((isLoggedIn && !isAuth) || (!isLoggedIn && isAuth)) ? <Component {...props}/> : null;
  };
    return AuthenticatedComponent;
};

export default withAuth;
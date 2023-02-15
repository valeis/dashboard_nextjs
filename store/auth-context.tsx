import { Router, useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import cookie from 'react-cookies'

import usersRequest from "../api/users";
import { User } from "../types/User";
import SSRLocalStorage from "@/utils/SSRLocalStorage";


type AuthProviderProps = {
  children: ReactNode;
  data:User
};

interface AuthContextType {
  isLoggedIn: boolean;
  currentUser: User;
  login: (body: { email: string; password: string }) => void;
  logout: () => void;
  isAuth: boolean;
  mutationLoading: boolean,
}

export const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: true,
  currentUser: {},
  login: () => {},
  logout: () => {},
  isAuth: false,
  mutationLoading: false
});

export const AuthContextProvider = ({ children, data }: AuthProviderProps, ) => {

  const router = useRouter();


  const [isAuth, setIsAuth] = useState(false);

  cookie.load('userId');

  const mutation = useMutation(usersRequest.getAuth, {
    onSuccess: (data) => {
      if (!data || data?.length === 0) {
        setIsAuth(false)
        return;
      }
      setIsAuth(true);
      cookie.save('userId', data[0].id, {path: '/'} )
      router.push("/dashboard");
    },
  });

  const userIsLoggedIn = false;

  const logoutHandler = () => {
    cookie.remove('userId', {path: '/'})
    setIsAuth(false);
  };

  const contextValue = {
    isLoggedIn: userIsLoggedIn,
    login: mutation.mutate,
    logout: logoutHandler,
    currentUser: data,
    isAuth,
    mutationLoading: mutation.isLoading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

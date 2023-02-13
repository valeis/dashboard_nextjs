import SSRLocalStorage from "@/utils/SSRLocalStorage";
import { Router, useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import usersRequest from "../api/users";
import { User } from "../types/User";

type AuthProviderProps = {
  children: ReactNode;
};

interface AuthContextType {
  isLoggedIn: boolean;
  currentUser: User;
  login: (body: { email: string; password: string }) => void;
  logout: () => void;
  isLoading: boolean;
  isAuth: boolean;
  mutationLoading: boolean,
}

export const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: true,
  currentUser: {},
  login: () => {},
  logout: () => {},
  isLoading: false,
  isAuth: false,
  mutationLoading: false
});

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const localeStorage = SSRLocalStorage();

  const router = useRouter();

  const initialToken = localeStorage.getItem("token");

  const [isAuth, setIsAuth] = useState(false);

  const mutation = useMutation(usersRequest.getAuth, {
    onSuccess: (data) => {
      if (!data || data?.length === 0) {
        setIsAuth(false)
        return;
      }
      setIsAuth(true);
      localStorage.setItem("token", data[0].id);
      router.push("/dashboard");
    },
  });

  const { data, isLoading, refetch } = useQuery(
    ["user", initialToken],
    () => usersRequest.getById(initialToken!),
    { enabled: !!initialToken }
  );

  const userIsLoggedIn = !!data;

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  const contextValue = {
    isLoggedIn: userIsLoggedIn,
    login: mutation.mutate,
    logout: logoutHandler,
    currentUser: data!,
    isLoading,
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

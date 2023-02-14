import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader } from "ebs-design";

import AuthContext from "@/store/auth-context";

const withAuth = <T extends object>(
  Component: React.ComponentType<T>,
  isAuth = false
) => {
  const AuthenticatedComponent = (props: T) => {
    const { isLoading, isLoggedIn } = useContext(AuthContext);
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
      setShowChild(true);
    }, []);

    const router = useRouter();

    useEffect(() => {
      const getUser = async () => {
        if (!isLoggedIn && !isAuth && !isLoading) {
          router.push("./login");
        } else if (isLoggedIn && isAuth && !isLoading) {
          router.push("./dashboard");
        }
      };
      getUser();
    }, [isLoading, isLoggedIn, router]);
    if (!showChild) {
      return null;
    }
    if (isLoading) return <Loader loading />;
    return (isLoggedIn && !isAuth) || (!isLoggedIn && isAuth) ? (
      <Component {...props} />
    ) : null;
  };
  return AuthenticatedComponent;
};

export default withAuth;

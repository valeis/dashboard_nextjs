import { useState, useEffect, useContext, ReactNode, ReactElement } from 'react';
import { useRouter } from 'next/router';

import AuthContext from '@/store/auth-context';
import { Loader } from 'ebs-design';
import { AppProps } from 'next/app';

export { RouterGuard };

type Props = {
    children: JSX.Element 
  }

const RouterGuard =({ children }:Props)=> {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const { isLoading, isLoggedIn } = useContext(AuthContext);
    
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
      setShowChild(true);
    }, []);

    useEffect(() =>{
        authCheck(router.asPath);

        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);
        router.events.on('routeChangeComplete', authCheck)
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, []);

    function authCheck(url:string) {
        const privatePaths = ["/users", "/posts", "/posts/[postId]/edit", "/posts/[postId]", "/posts/create", "/dashboard"];
        const path = url.split('?')[0];
        if (!isLoggedIn && privatePaths.includes(router.pathname)){
            setAuthorized(false);
            router.push({
                pathname: '/login',
                query: {returnUrl: router.asPath}
            });
        } else {
            setAuthorized(true);
        }
    }

    if (!showChild) {
        return null;
      }
      
    if (!authorized) return <Loader loading />
    return children;
}
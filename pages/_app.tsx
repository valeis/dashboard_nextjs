import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import React, { useContext } from "react";
import NextNProgress from "nextjs-progressbar";

import LayoutDashboard from "@/components/Layout/Layout";
import AuthContext, { AuthContextProvider } from "@/store/auth-context";
import { RouterGuard } from "@/components/RouteGuard";

import "styles/index.scss";
import { Loader } from "ebs-design";

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const authCtx = useContext(AuthContext);

  const withLayout = [
    "/users",
    "/posts",
    "/posts/[postId]/edit",
    "/posts/[postId]",
    "/posts/create",
    "/dashboard",
  ].includes(appProps.router.pathname);
  const LayoutComponent = withLayout ? LayoutDashboard : React.Fragment;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <LayoutComponent>
            <NextNProgress color="#3366FF" options={{ showSpinner: false }} />
            <RouterGuard>
              <Component {...pageProps} /> 
            </RouterGuard>
          </LayoutComponent>
        </Hydrate>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

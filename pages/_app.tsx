import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import React from "react";
import NextNProgress from 'nextjs-progressbar'

import LayoutDashboard from "@/components/Layout/Layout";
import { AuthContextProvider } from "@/store/auth-context";

import "styles/index.scss";

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

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
            <NextNProgress color="#3366FF" options={{ showSpinner: false}}/>
            <Component {...pageProps} />  
          </LayoutComponent>
        </Hydrate>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

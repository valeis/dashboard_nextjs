import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import React, { useContext } from "react";
import NextNProgress from "nextjs-progressbar";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend";

import LayoutDashboard from "@/components/Layout/Layout";
import AuthContext, { AuthContextProvider } from "@/store/auth-context";

import "styles/index.scss";

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      })
  );
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
      <AuthContextProvider data={pageProps.user}>
        <Hydrate state={pageProps.dehydratedState}>
          <LayoutComponent>
            <NextNProgress color="#3366FF" options={{ showSpinner: false }} />
              <Component {...pageProps} />
          </LayoutComponent>
        </Hydrate>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

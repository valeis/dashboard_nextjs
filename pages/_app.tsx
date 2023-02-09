import LayoutDashboard from "@/components/Layout/Layout";
import { AuthContextProvider } from "@/store/auth-context";
import type { AppProps } from "next/app";
import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import "styles/index.scss";

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  const withLayout = ['/users','/posts', '/posts/[postId]/edit', '/posts/[postId]', '/posts/create', '/dashboard'].includes(appProps.router.pathname);
  const LayoutComponent = withLayout ? LayoutDashboard : React.Fragment ;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
          <AuthContextProvider>
            <LayoutComponent>
            <Component {...pageProps} />
            </LayoutComponent>
          </AuthContextProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

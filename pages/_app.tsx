import LayoutDashboard from "@/components/Layout/Layout";
import { AuthContextProvider } from "@/store/auth-context";
import type { AppProps } from "next/app";
import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import "styles/index.scss";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());


  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
          <AuthContextProvider>
            <LayoutDashboard>
            <Component {...pageProps} />
            </LayoutDashboard>
          </AuthContextProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

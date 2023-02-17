import usersRequest from "@/api/users";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 25 * (60 * 1000) ,
      cacheTime: 30 * (60 * 1000),
    }
  }
});

export const getAuth =(fn?: (context?: GetServerSidePropsContext) => Promise<any>): GetServerSideProps =>
  async (context) => {
    let userId = context.req.cookies["userId"];
    const publicPaths = ["/login", "/register"];
    
    const includesPublicPaths = publicPaths.includes(context.resolvedUrl);
    let user = null;

    try {
      if (!userId) await Promise.reject();
      user = await queryClient.fetchQuery(["user", userId], () =>
        usersRequest.getById(userId!)
      );
    } catch (error) {
      context.res.setHeader("Set-Cookie", "userId=null; Max-Age=0");
      return {
        props: {},
        ...(!includesPublicPaths && { redirect: { destination: "/login" } }),
      };
    }

    const data = await fn?.(context);

    return {
      props: {
        ...data?.props,
        user,
      },
      ...(includesPublicPaths && { redirect: { destination: "/dashboard" } }),
    };
  };

import usersRequest from "@/api/users";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { QueryClient } from "react-query";

const queryClient = new QueryClient();

export const getAuth =
  (
    fn?: (context?: GetServerSidePropsContext) => Promise<any>
  ): GetServerSideProps =>
  async (context) => {
    let userId = context.req.cookies["userId"];
    const publicPaths = ["/login", "/register"];

    let user = null;
    try {
      if (userId)
      user = await queryClient.fetchQuery(["user", userId], () =>
        usersRequest.getById(userId!)
      );
    } catch (error) {
       if (!!userId && !user) {
        context.res.setHeader("Set-Cookie", "userId=null; Max-Age=0");
        return {
          props: {},
          redirect: {
            destination: "/login",
          },
        };
      }
    }

    if (!!userId && publicPaths.includes(context.resolvedUrl)) {
      return {
        props: {},
        redirect: {
          destination: "/dashboard",
        },
      };
    } else if (!userId && !publicPaths.includes(context.resolvedUrl)) {
      return {
        props: {},
        redirect: {
          destination: "/login",
        },
      };
    } 

    const data = await fn?.(context);

    return {
      props: {
        ...data?.props,
        user,
      },
    };
  };

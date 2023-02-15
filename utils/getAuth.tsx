import usersRequest from "@/api/users";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { QueryClient } from "react-query";
import { useRouter } from 'next/router'

export const getAuth = (fn?:(context?:GetServerSidePropsContext)=>Promise<any>): GetServerSideProps => async(context) => {
    const queryClient = new QueryClient();
    const userId = context.req.cookies["userId"];
    const publicPaths = ["/login", "/register"];


    let user = null;
    try {
      user = await queryClient.fetchQuery(["user", userId], () =>
        usersRequest.getById(userId!)
      );
    } catch (error) {
        if (!userId && !publicPaths.includes(context.resolvedUrl)){
            return{
                props: {},
                redirect: {
                    destination: '/login'
                }
            }
        }
    }

    if (!!userId && publicPaths.includes(context.resolvedUrl)) {
        return{
            props: {},
            redirect:{
                destination: '/dashboard'
            }
        }
    }

   const data = await fn?.(context);

      return {
        props: { 
          ...data?.props,
          user,
        },
      };
    };
  
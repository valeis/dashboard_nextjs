import LoginForm from "@/components/LoginForm/LoginForm";
import withAuth from "@/HOC/withAuth";
import { getAuth } from "@/utils/getAuth";
import { GetServerSideProps } from "next";

const LoginPage = () => {
  return <LoginForm />;
};

export const getServerSideProps:GetServerSideProps = getAuth(async()=>{}) 

export default LoginPage;

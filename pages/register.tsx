import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import withAuth from "@/HOC/withAuth";
import { getAuth } from "@/utils/getAuth";
import { GetServerSideProps } from "next";

const RegisterPage=()=>{
    return (
        <RegistrationForm />
    )
} 

export const getServerSideProps:GetServerSideProps = getAuth(async()=>{}) 

export default RegisterPage;
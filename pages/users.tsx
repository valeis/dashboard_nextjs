import Users from "@/components/UsersTable/UsersTable";
import withAuth from "@/HOC/withAuth";

const UsersPage = () => {
    return( <Users />)
}

export default withAuth(UsersPage);
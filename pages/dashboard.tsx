import LineRechartComponent from "@/components/Chart/Chart";
import withAuth from "@/HOC/withAuth";

const Dashboard = () => {
  return (
    <>
      <h1 className="title_dashboard">Statistica postărilor</h1>
      <LineRechartComponent />
    </>
  );
};

export default withAuth(Dashboard);


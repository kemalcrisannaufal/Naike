import DashboardAdminView from "@/components/views/admin/Dashboard";
import Head from "next/head";

const AdminPage = () => {
  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <DashboardAdminView />
    </>
  );
};

export default AdminPage;

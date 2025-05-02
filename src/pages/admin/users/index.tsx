import { useUser } from "@/components/hooks/useUser";
import UsersAdminViews from "@/components/views/admin/Users";
import Head from "next/head";

const UsersAdminPage = () => {
  const { users } = useUser();
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <UsersAdminViews users={users} />
    </>
  );
};

export default UsersAdminPage;

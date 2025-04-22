import { useUser } from "@/components/hooks/useUser";
import UsersAdminViews from "@/components/views/admin/Users";

const UsersAdminPage = () => {
  const { users } = useUser();
  return (
    <>
      <UsersAdminViews users={users} />
    </>
  );
};

export default UsersAdminPage;

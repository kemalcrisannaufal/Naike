import UsersAdminViews from "@/components/views/admin/Users";
import { userServices } from "@/services/user";
import { useEffect, useState } from "react";

const UsersAdminPage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
    };
    getAllUsers();
  }, []);

  return (
    <>
      <UsersAdminViews users={users} />
    </>
  );
};

export default UsersAdminPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
import UsersAdminViews from "@/components/views/admin/Users";
import { userServices } from "@/services/user";
import { useEffect, useState } from "react";

const UsersAdminPage = ({ setToaster }: { setToaster: any }) => {
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
      <UsersAdminViews users={users} setToaster={setToaster} />
    </>
  );
};

export default UsersAdminPage;

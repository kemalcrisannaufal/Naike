import AdminLayout from "@/components/layouts/Admin";
import { useContext, useEffect, useState } from "react";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import { User } from "@/types/user.type";
import Title from "@/components/ui/Text/Title";
import { ToasterContext } from "@/contexts/ToasterContext";
import UserTable from "./UserTable";
import UserTableSkeleton from "./UserTable/skeleton";

type Proptypes = {
  users: User[];
};

const UsersAdminViews = (props: Proptypes) => {
  const { users } = props;
  const { setToaster } = useContext(ToasterContext);
  const [updatedUser, setUpdatedUser] = useState<User | object>({});
  const [deletedUser, setDeletedUser] = useState<User | object>({});
  const [usersData, setUsersData] = useState<User[]>([]);

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  return (
    <>
      <AdminLayout>
        <Title>User Management</Title>
        {usersData.length === 0 ? (
          <UserTableSkeleton />
        ) : (
          <UserTable
            usersData={usersData}
            setUpdatedUser={setUpdatedUser}
            setDeletedUser={setDeletedUser}
          />
        )}
      </AdminLayout>

      {Object.keys(updatedUser).length > 0 && (
        <ModalUpdateUser
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
          setUsersData={setUsersData}
        />
      )}

      {Object.keys(deletedUser).length > 0 && (
        <ModalDeleteUser
          deletedUser={deletedUser}
          setDeletedUser={setDeletedUser}
          setUsersData={setUsersData}
          setToaster={setToaster}
        />
      )}
    </>
  );
};

export default UsersAdminViews;

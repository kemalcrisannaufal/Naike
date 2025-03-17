import AdminLayout from "@/components/layouts/Admin";
import Button from "@/components/ui/Button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import { User } from "@/types/user.type";
import Title from "@/components/ui/Text/Title";

type Proptypes = {
  users: User[];
  setToaster: Dispatch<SetStateAction<object>>;
};

const UsersAdminViews = (props: Proptypes) => {
  const { users, setToaster } = props;
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
        <div className="mt-5 border border-gray-300 rounded-lg overflow-x-auto">
          <table className="bg-white w-full min-w-max border-collapse">
            <thead>
              <tr className="border-gray-300 border-b font-semibold text-neutral-600 lg:text-md text-sm">
                <th className="bg-neutral-100 p-4 text-center">No</th>
                <th className="bg-neutral-100 p-4 text-center">Fullname</th>
                <th className="bg-neutral-100 p-4 text-center">Email</th>
                <th className="bg-neutral-100 p-4 text-center">Phone</th>
                <th className="bg-neutral-100 p-4 text-center">Role</th>
                <th className="bg-neutral-100 p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user: User, index: number) => (
                <tr
                  key={index}
                  className="hover:bg-neutral-100 border-neutral-200 border-b last:border-b-0 text-neutral-700"
                >
                  <td className="px-4 py-3 text-center">{index + 1}</td>
                  <td className="px-4 py-3 text-center">{user.fullname}</td>
                  <td className="px-4 py-3 text-center">{user.email}</td>
                  <td className="px-4 py-3 text-center">{user.phone}</td>
                  <td className="px-4 py-3 text-center">{user.role}</td>
                  <td className="flex justify-center items-center gap-2 px-4 py-3">
                    <Button
                      type="button"
                      onClick={() => setUpdatedUser(user)}
                      classname="bg-yellow-500 hover:bg-yellow-700"
                    >
                      <i className="text-lg bx bxs-edit" />
                    </Button>

                    <Button
                      type="button"
                      classname="bg-red-500 hover:bg-red-800"
                      onClick={() => setDeletedUser(user)}
                    >
                      <i className="text-lg bx bxs-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>

      {Object.keys(updatedUser).length > 0 && (
        <ModalUpdateUser
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
          setUsersData={setUsersData}
          setToaster={setToaster}
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

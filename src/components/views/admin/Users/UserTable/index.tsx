import Button from "@/components/ui/Button";
import { User } from "@/types/user.type";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type Proptypes = {
  usersData: User[];
  setUpdatedUser: Dispatch<SetStateAction<User>>;
  setDeletedUser: Dispatch<SetStateAction<User>>;
  idxPage?: number;
  dataPerPage?: number;
};

const UserTable = (props: Proptypes) => {
  const {
    usersData,
    setUpdatedUser,
    setDeletedUser,
    idxPage = 0,
    dataPerPage = 0,
  } = props;
  const tableHeaderClass =
    "bg-neutral-100 px-4 py-4 border-neutral-300 border-b text-neutral-700 text-center";
  const tableCellClass = "px-4 py-2 text-center";
  return (
    <div className="mt-5 border border-gray-300 rounded-lg overflow-x-auto">
      <table className="bg-white w-full min-w-max border-collapse">
        {/* Table header */}
        <thead>
          <tr className="border-gray-300 border-b font-semibold text-neutral-600 lg:text-md text-sm">
            <th className={tableHeaderClass}>No</th>
            <th className={tableHeaderClass}>Avatar</th>
            <th className={tableHeaderClass}>Fullname</th>
            <th className={tableHeaderClass}>Email</th>
            <th className={tableHeaderClass}>Phone</th>
            <th className={tableHeaderClass}>Role</th>
            <th className={tableHeaderClass}>Action</th>
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {usersData.map((user: User, index: number) => (
            <tr
              key={index}
              className="hover:bg-neutral-100 border-neutral-200 border-b last:border-b-0 text-neutral-700"
            >
              <td className={tableCellClass}>
                {idxPage * dataPerPage + index + 1}
              </td>
              <td className={tableCellClass}>
                <div className="flex justify-center items-center bg-neutral-100 border-2 border-neutral-300 rounded-full w-20 h-20 overflow-hidden hover:scale-150 hover:transition">
                  {user.image !== "" ? (
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      alt={user.fullname}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="font-semibold text-neutral-600 text-3xl">
                      {user.fullname.charAt(0).toUpperCase()}
                    </p>
                  )}
                </div>
              </td>
              <td className={tableCellClass}>{user.fullname}</td>
              <td className={tableCellClass}>{user.email}</td>
              <td className={tableCellClass}>{user.phone}</td>
              <td className={tableCellClass}>
                <p
                  className={`${
                    user.role === "admin"
                      ? "bg-green-200 text-green-600"
                      : "bg-blue-200 text-blue-600"
                  } text-xs p-2 rounded-full border font-semibold`}
                >
                  {user.role.toUpperCase()}
                </p>
              </td>
              <td
                className={`${tableCellClass} py-4 flex justify-center items-center gap-2`}
              >
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
  );
};

export default UserTable;

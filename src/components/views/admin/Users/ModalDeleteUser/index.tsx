/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { userServices } from "@/services/user";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import { User } from "@/types/user.type";
import Title from "@/components/ui/Text/Title";

type Proptypes = {
  deletedUser: User | any;
  setDeletedUser: Dispatch<SetStateAction<object>>;
  setUsersData: Dispatch<SetStateAction<User[]>>;
  setToaster: Dispatch<SetStateAction<object>>;
};

const ModalDeleteUser = (props: Proptypes) => {
  const { deletedUser, setDeletedUser, setUsersData, setToaster } = props;
  const session: any = useSession();
  const handleDelete = async () => {
    try {
      const result = await userServices.deleteUser(
        deletedUser.id,
        session.data.accessToken
      );
      if (result.status == 200) {
        setDeletedUser({});
        const { data } = await userServices.getAllUsers();
        setUsersData(data.data);
        setToaster({
          variant: "success",
          message: "Data deleted successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      setToaster({
        variant: "danger",
        message: "Failed to delete data. Please try again.",
      });
    }
  };
  return (
    <Modal onClose={() => setDeletedUser({})}>
      <Title variant="small">Delete User</Title>
      <p className="my-2 text-neutral-700">
        Are you sure want to delete this user?
      </p>

      <div className="bg-neutral-200 mb-2 p-4 rounded">
        <p className="mb-1 font-medium text-neutral-700">
          Name : {deletedUser.fullname}
        </p>
        <p className="mb-1 font-medium text-neutral-700">
          Email : {deletedUser.email}
        </p>
        <p className="font-medium text-neutral-700">
          Role : {deletedUser.role}
        </p>
      </div>

      <div className="flex justify-end">
        <Button type="button" onClick={() => handleDelete()} classname="px-5">
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDeleteUser;

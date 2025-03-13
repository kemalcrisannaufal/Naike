/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { userServices } from "@/services/user";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import { User } from "@/types/user.type";

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
      <h1 className="text-xl text-neutral-800 font-bold mb-3">
        Apakah kamu yakin ingin menghapus data?
        {deletedUser.fullname}
      </h1>
      <Button type="button" onClick={() => handleDelete()}>
        Delete
      </Button>
    </Modal>
  );
};

export default ModalDeleteUser;

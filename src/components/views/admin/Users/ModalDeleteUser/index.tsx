/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { userServices } from "@/services/user";

type Proptypes = {
  deletedUser: any;
  setDeletedUser: any;
  setUserData: any;
};

const ModalDeleteUser = (props: Proptypes) => {
  const { deletedUser, setDeletedUser, setUserData } = props;
  const handleDelete = async (id: string) => {
    try {
      const result = await userServices.deleteUser(id);
      if (result.status == 200) {
        setDeletedUser({});
        const { data } = await userServices.getAllUsers();
        setUserData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1 className="text-xl text-neutral-800 font-bold mb-3">
        Apakah kamu yakin ingin menghapus data?
        {deletedUser.fullname}
      </h1>
      <Button type="button" onClick={() => handleDelete(deletedUser.id)}>
        Delete
      </Button>
    </Modal>
  );
};

export default ModalDeleteUser;

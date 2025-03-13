/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { userServices } from "@/services/user";
import { useSession } from "next-auth/react";
import { User } from "@/types/user.type";

type Proptypes = {
  updatedUser: User | any;
  setUpdatedUser: Dispatch<SetStateAction<object>>;
  setUsersData: Dispatch<SetStateAction<User[]>>;
  setToaster: Dispatch<SetStateAction<object>>;
};

const ModalUpdateUser = (props: Proptypes) => {
  const { updatedUser, setUpdatedUser, setUsersData, setToaster } = props;
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    };

    try {
      const result = await userServices.updateUser(
        updatedUser.id,
        data,
        session.data.accessToken
      );
      if (result.status === 200) {
        setIsLoading(false);
        setUpdatedUser({});
        const { data } = await userServices.getAllUsers();
        setUsersData(data.data);
        setToaster({
          variant: "success",
          message: "Data updated successfully!",
        });
      } else {
        setIsLoading(false);
        setToaster({
          variant: "error",
          message: "Failed to update data. Please try again.",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setToaster({
        variant: "error",
        message: "Failed to update data. Please try again.",
      });
    }
  };
  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1 className="text-xl text-neutral-800 font-bold mb-3">Update User</h1>
      <form onSubmit={handleUpdate}>
        <Input
          label="Nama Lengkap"
          name="fullname"
          type="text"
          defaultValue={updatedUser.fullname}
          disabled
        />
        <Input
          label="Email"
          name="email"
          type="email"
          defaultValue={updatedUser.email}
          disabled
        />
        <Input
          label="Nomor Handphone"
          name="phone"
          type="number"
          defaultValue={updatedUser.phone}
          disabled
        />
        <Select
          label="Role"
          name="role"
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
          defaultValue={updatedUser.role}
        />
        <Button type="submit">{isLoading ? "Updating..." : "Update"}</Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;

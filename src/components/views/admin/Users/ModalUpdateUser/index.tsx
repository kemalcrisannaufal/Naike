/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { FormEvent, useState } from "react";
import { userServices } from "@/services/user";
import { useSession } from "next-auth/react";

type Proptypes = {
  updatedUser: any;
  setUpdatedUser: any;
  setUserData: any;
};

const ModalUpdateUser = (props: Proptypes) => {
  const { updatedUser, setUpdatedUser, setUserData } = props;
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
        setUserData(data.data);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
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
        <Button type="submit">{isLoading ? "Memuat..." : "Update"}</Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;

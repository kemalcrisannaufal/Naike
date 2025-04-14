/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { userServices } from "@/services/user";
import { User } from "@/types/user.type";
import Title from "@/components/ui/Text/Title";
import { ToasterContext } from "@/contexts/ToasterContext";

type Proptypes = {
  updatedUser: User | any;
  setUpdatedUser: Dispatch<SetStateAction<object>>;
  setUsersData: Dispatch<SetStateAction<User[]>>;
};

const ModalUpdateUser = (props: Proptypes) => {
  const { updatedUser, setUpdatedUser, setUsersData } = props;
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
      updated_at: new Date(),
    };

    try {
      const result = await userServices.updateUser(updatedUser.id, data);
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
      <Title variant="small">Update User</Title>
      <form onSubmit={handleUpdate} className="mt-3">
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
        <div className="flex justify-end mt-5 w-full">
          <Button type="submit" classname="px-5">
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Title from "@/components/ui/Text/Title";
import TextArea from "@/components/ui/TextArea";
import { Address } from "@/types/address.type";
import { Dispatch, FormEvent, SetStateAction } from "react";

type Proptypes = {
  address?: Address;
  addressList: Address[];
  onAddAddress: (data: Address[]) => Promise<void>;
  setAddNewAddress: Dispatch<SetStateAction<boolean>>;
  type?: "update" | "add";
};

const AddNewAddress = (props: Proptypes) => {
  const {
    onAddAddress,
    setAddNewAddress,
    address,
    addressList,
    type = "add",
  } = props;
  console.log(address);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const newAddress = {
      recipient: form.recipient.value,
      phone: form.phone.value,
      addressLine: form.addressLine.value,
      note: form.note.value,
      isMain: false,
    };

    if (type === "update") {
      const data = addressList.map((item) => {
        if (item === address) {
          return newAddress;
        } else {
          return item;
        }
      });
      await onAddAddress(data);
      setAddNewAddress(false);
    } else {
      const data = [...addressList, newAddress];
      await onAddAddress(data);
      setAddNewAddress(false);
    }
  };

  return (
    <div>
      <Title variant="small">
        {type === "update" ? "Update" : "Add"} Address
      </Title>
      <form className="mt-5" onSubmit={handleSubmit}>
        <Input
          label="Recipient"
          name="recipient"
          type="text"
          placeholder="Recipient name"
          defaultValue={address && address.recipient}
        />
        <Input
          label="Recipient Phone"
          name="phone"
          type="number"
          placeholder="Recipient phone number"
          defaultValue={address && address.phone}
        />
        <TextArea
          label="Address Line"
          name="addressLine"
          placeholder="Insert address line"
          defaultValue={address && address.addressLine}
        />
        <Input
          label="Note"
          name="note"
          type="text"
          placeholder="Shipping note"
          defaultValue={address && address.note}
        />
        <Button classname="w-full" type="submit">
          Save Address
        </Button>
      </form>
    </div>
  );
};

export default AddNewAddress;

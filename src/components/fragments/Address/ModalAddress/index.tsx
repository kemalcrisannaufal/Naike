import Modal from "@/components/ui/Modal";
import Title from "@/components/ui/Text/Title";
import { Address } from "@/types/address.type";
import { Dispatch, SetStateAction, useState } from "react";
import AddressCard from "../../../fragments/Address/AddressCard";
import Button from "@/components/ui/Button";
import AddNewAddress from "./AddNewAddress";
import { User } from "@/types/user.type";

type Proptypes = {
  onClose: () => void;
  addressList: Address[];
  selectedAddress: Address | undefined;
  setSelectedAddress: Dispatch<SetStateAction<Address | undefined>>;
  onAddAddress: (data: Address[]) => Promise<void>;
  setProfile: Dispatch<SetStateAction<User>>;
  modalAddress: boolean;
};
const ModalAddress = (props: Proptypes) => {
  const {
    onClose,
    addressList,
    selectedAddress,
    setSelectedAddress,
    onAddAddress,
    setProfile,
    modalAddress,
  } = props;
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [updatedAddress, setUpdatedAddress] = useState<Address | object>({});

  return (
    <>
      <Modal onClose={onClose}>
        {!addNewAddress && Object.keys(updatedAddress).length === 0 ? (
          <div>
            <Title variant="small">Address</Title>
            <div className="flex flex-col gap-2 my-3">
              {addressList.map((item, index) => {
                return (
                  <AddressCard
                    key={index}
                    address={item}
                    selectedAddress={selectedAddress}
                    addressList={addressList}
                    classname={`bg-white ${
                      selectedAddress === item
                        ? "border-primary border-2"
                        : "border-neutral-200"
                    }`}
                    onClick={() => setSelectedAddress(item)}
                    setProfile={setProfile}
                    setUpdatedAddress={setUpdatedAddress}
                    modalAddress={modalAddress}
                  />
                );
              })}
            </div>
            <Button
              onClick={() => {
                setAddNewAddress(true);
              }}
            >
              Add New Adress
            </Button>
          </div>
        ) : Object.keys(updatedAddress).length > 0 ? (
          <AddNewAddress
            type="update"
            address={updatedAddress as Address}
            addressList={addressList}
            onAddAddress={onAddAddress}
            setAddNewAddress={setAddNewAddress}
          />
        ) : (
          <AddNewAddress
            addressList={addressList}
            onAddAddress={onAddAddress}
            setAddNewAddress={setAddNewAddress}
          />
        )}
      </Modal>
    </>
  );
};

export default ModalAddress;

import IconButton from "@/components/ui/IconButton";
import { ToasterContext } from "@/contexts/ToasterContext";
import { userServices } from "@/services/user";
import { Address } from "@/types/address.type";
import { User } from "@/types/user.type";
import { Dispatch, SetStateAction, useContext } from "react";

type Proptypes = {
  address: Address | undefined;
  addressList?: Address[];
  onClick: () => void;
  classname?: string;
  setProfile?: Dispatch<SetStateAction<User>>;
  selectedAddress: Address | undefined;
  setUpdatedAddress?: Dispatch<SetStateAction<Address | object>>;
  modalAddress?: boolean;
};

const AddressCard = (props: Proptypes) => {
  const {
    address,
    onClick,
    classname,
    addressList,
    setProfile,
    selectedAddress,
    setUpdatedAddress,
    modalAddress = false,
  } = props;
  const { setToaster } = useContext(ToasterContext);

  const handleDelete = async () => {
    const data = { address: addressList?.filter((item) => item !== address) };
    const result = await userServices.updateProfile(data);
    if (result.status === 200) {
      const { data } = await userServices.getProfile();
      setProfile!(data.data);
      setToaster({
        variant: "success",
        message: "Successfully delete address!",
      });
    } else {
      setToaster({
        variant: "error",
        message: "Failed to delete address!",
      });
    }
  };

  const handleUpdateIsMain = async () => {
    const data = {
      address: addressList?.map((item) => {
        if (item === address) {
          return { ...item, isMain: true };
        } else {
          return { ...item, isMain: false };
        }
      }),
    };

    const result = await userServices.updateProfile(data);
    if (result.status === 200) {
      const { data } = await userServices.getProfile();
      setProfile!(data.data);
      setToaster({
        variant: "success",
        message: "Successfully update address!",
      });
    } else {
      setToaster({
        variant: "error",
        message: "Failed to update address!",
      });
    }
  };

  return (
    <div
      className={`block relative bg-neutral-100 p-3 border border-neutral-200 rounded-lg  ${classname}`}
    >
      <button onClick={onClick} className="w-full text-left cursor-pointer">
        <p className="font-semibold text-neutral-800 text-sm md:text-lg">
          {address?.recipient}
        </p>
        <p className="text-neutral-600 md:text-md text-xs">{address?.phone}</p>
        <p className="text-neutral-600 md:text-md text-xs">
          {address?.addressLine}
        </p>
        <p className="text-neutral-600 md:text-md text-xs">
          Note : {address?.note}
        </p>
      </button>

      <div className="top-2 right-2 absolute flex items-center gap-2">
        <div
          className={`${
            address?.isMain
              ? "bg-primary p-2 rounded flex gap-2 items-center"
              : "hidden"
          }`}
        >
          <i className="text-white text-xs md:text-base bx bxs-star" />
          <p className="font-semibold text-white text-xs">Primary</p>
        </div>

        <IconButton
          onClick={() => setUpdatedAddress!(address || {})}
          icon="bx-pencil"
          classname={`${
            address === selectedAddress && !modalAddress ? "hidden" : ""
          }`}
        />

        <IconButton
          onClick={handleUpdateIsMain}
          icon="bx-star"
          classname={`${!address?.isMain ? "" : "hidden"}`}
        />

        <IconButton
          onClick={handleDelete}
          icon="bx-trash"
          classname={`${
            !address?.isMain && selectedAddress !== address ? "" : "hidden"
          }`}
        />
      </div>
    </div>
  );
};

export default AddressCard;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToasterContext } from "@/contexts/ToasterContext";
import { uploadFile } from "@/lib/firebase/service";
import { userServices } from "@/services/user";
import { User } from "@/types/user.type";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import ProfilePassword from "./ProfilePassword";
import ProfileInfo from "./ProfileInfo";
import ProfileDetail from "./ProfileDetail";
import AddressCard from "../../../fragments/Address/AddressCard";

import { Address } from "@/types/address.type";
import ModalAddress from "@/components/fragments/Address/ModalAddress";

type Proptypes = {
  profile: User | any;
  setProfile: Dispatch<SetStateAction<object>>;
};

const ProfileMemberView = (props: Proptypes) => {
  const { profile, setProfile } = props;
  const { setToaster } = useContext(ToasterContext);
  const [avatar, setAvatar] = useState<File | any>({});
  const [isLoading, setIsLoading] = useState("");
  const [modalAddress, setModalAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>();

  useEffect(() => {
    if (profile && profile.address) {
      setSelectedAddress(
        profile.address.find((item: Address) => item.isMain === true)
      );
    }
  }, [profile]);

  const handleChangeProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("profile");
    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
      updated_at: new Date(),
    };

    const result = await userServices.updateProfile(data);

    if (result.status === 200) {
      setIsLoading("");
      form.reset();
      setProfile({ ...profile, fullname: data.fullname, phone: data.phone });
      setToaster({
        variant: "success",
        message: "Profile updated successfully!",
      });
    } else {
      form.reset();
      setIsLoading("");
      setToaster({
        variant: "error",
        message: "Failed to upload image. Please try again.",
      });
    }
  };

  const handleChangeProfilePicture = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const file = form.image.files[0];
    setIsLoading("avatar");
    if (file) {
      const newName = "profile." + file.name.split(".")[1];
      uploadFile(
        profile.id,
        file,
        newName,
        "users",
        async (status: boolean, newImageUrl: string) => {
          if (status) {
            const data = {
              image: newImageUrl,
              updated_at: new Date(),
            };
            const result = await userServices.updateProfile(data);

            if (result.status === 200) {
              setIsLoading("");
              setProfile({ ...profile, image: newImageUrl });
              setAvatar({});
              form.reset();
              setToaster({
                variant: "success",
                message: "Profile picture updated successfully!",
              });
            } else {
              setToaster({
                variant: "error",
                message: "Failed to upload image. Please try again.",
              });
            }
          } else {
            setIsLoading("");
            setAvatar({});
            form.reset();
            setToaster({
              variant: "error",
              message: "Failed to upload image. Please try again.",
            });
          }
        }
      );
    } else {
      setIsLoading("");
      form.reset();
      setToaster({
        variant: "error",
        message: "Please select an image.",
      });
    }
  };

  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("password");
    const form = e.target as HTMLFormElement;

    const data = {
      password: form["new-password"].value,
      oldPassword: form["old-password"].value,
      encryptedPassword: profile.password,
      updated_at: new Date(),
    };

    try {
      const result = await userServices.updateProfile(data);

      if (result.status === 200) {
        setIsLoading("");
        form.reset();
        setToaster({
          variant: "success",
          message: "Password updated successfully!",
        });
      } else {
        setIsLoading("");
        form.reset();
        setToaster({
          variant: "error",
          message: "Password update failed. Check your current password.",
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading("");
      form.reset();
      setToaster({
        variant: "error",
        message: "Password update failed. Check your current password.",
      });
    }
  };

  const onAddAddress = async (data: Address[]) => {
    const result = await userServices.updateProfile({
      address: data,
    });

    if (result.status === 200) {
      setModalAddress(false);
      setProfile({ ...profile, address: data });
      setToaster({
        variant: "success",
        message: "Successfully update address!",
      });
    } else {
      setToaster({
        variant: "error",
        message: "Failed to update address. Please try again later!",
      });
    }
  };

  return (
    <div className="p-5 md:px-32 md:py-10">
      <ProfileInfo
        profile={profile}
        handleChangeProfilePicture={handleChangeProfilePicture}
        isLoading={isLoading}
        avatar={avatar}
        setAvatar={setAvatar}
      />

      <div className="mb-5">
        {profile.address && profile.address?.length > 0 ? (
          <AddressCard
            address={selectedAddress}
            addressList={profile.address}
            selectedAddress={selectedAddress}
            onClick={() => setModalAddress(true)}
            setProfile={setProfile}
          />
        ) : (
          <div
            className={`block bg-neutral-100 p-3 border border-neutral-200 rounded-lg  `}
          >
            <p>
              Your address is empty. Please add your address{" "}
              <button
                onClick={() => setModalAddress(true)}
                className="cursor-pointer"
              >
                <span className="font-semibold underline">here!</span>
              </button>
            </p>
          </div>
        )}
      </div>

      <div className="flex md:flex-row flex-col gap-2 h-max">
        <ProfileDetail
          handleChangeProfile={handleChangeProfile}
          profile={profile}
          isLoading={isLoading}
        />
        <ProfilePassword
          handleChangePassword={handleChangePassword}
          profile={profile}
          isLoading={isLoading}
        />
      </div>

      {modalAddress && (
        <ModalAddress
          modalAddress={modalAddress}
          onClose={() => setModalAddress(false)}
          addressList={profile.address || []}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          onAddAddress={onAddAddress}
          setProfile={setProfile}
        />
      )}
    </div>
  );
};

export default ProfileMemberView;

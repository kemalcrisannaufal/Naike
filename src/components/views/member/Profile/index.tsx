/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { uploadFile } from "@/lib/firebase/service";
import { userServices } from "@/services/user";
import Image from "next/image";
import { useState } from "react";

type Proptypes = {
  profile: any;
  setProfile: any;
  session: any;
  setToaster: any;
};

const ProfileMemberView = (props: Proptypes) => {
  const { profile, setProfile, session, setToaster } = props;
  const [changeImage, setChangeImage] = useState<any>({});
  const [isLoading, setIsLoading] = useState("");
  console.log(session);

  const handleChangeProfile = async (e: any) => {
    e.preventDefault();
    setIsLoading("profile");
    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };

    const result = await userServices.updateProfile(
      profile.id,
      data,
      session.data.accessToken
    );

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

  const handleChangeProfilePicture = (e: any) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    setIsLoading("avatar");
    if (file) {
      uploadFile(
        profile.id,
        file,
        async (status: boolean, newImageUrl: string) => {
          if (status) {
            const data = {
              image: newImageUrl,
            };
            const result = await userServices.updateProfile(
              profile.id,
              data,
              session.data.accessToken
            );

            if (result.status === 200) {
              setIsLoading("");
              setProfile({ ...profile, image: newImageUrl });
              setChangeImage({});
              e.target[0].value = null;
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
            setChangeImage({});
            e.target[0].value = null;
            setToaster({
              variant: "error",
              message: "Failed to upload image. Please try again.",
            });
          }
        }
      );
    }
  };

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    setIsLoading("password");
    const form = e.target as HTMLFormElement;

    const data = {
      password: form["new-password"].value,
      oldPassword: form["old-password"].value,
      encryptedPassword: profile.password,
    };

    const result = await userServices.updateProfile(
      profile.id,
      data,
      session.data.accessToken
    );

    if (result.status === 200) {
      setIsLoading("");
      form.reset();
      setToaster({
        variant: "success",
        message: "Password updated successfully!",
      });
    } else {
      setIsLoading("");
      setToaster({
        variant: "error",
        message:
          "Failed to update password. Please check your current password.",
      });
    }
  };

  return (
    <div className="p-5 md:px-32 md:py-10">
      <div className="w-full bg-white rounded-lg p-3 md:p-5 flex flex-col md:flex-row justify-start items-center gap-5 border border-neutral-200 mb-5">
        <div className="w-full flex flex-col justify-center items-start p-5">
          <div className="w-full flex flex-col md:flex-row md:gap-10 items-center">
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 md:w-32 md:h-32 rounded-full overflow-hidden mb-2 hover:scale-105 transition-all ease-in-out duration-100">
                {profile.image ? (
                  <Image
                    src={profile.image}
                    alt="profile"
                    className="w-full object-cover"
                    width={100}
                    height={100}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex justify-center items-center">
                    <p className="text-5xl font-medium text-indigo-600">
                      {profile.fullname &&
                        profile.fullname.charAt(0).toUpperCase()}
                    </p>
                  </div>
                )}
              </div>
              <form
                onSubmit={handleChangeProfilePicture}
                className="flex md:flex-col items-center gap-3 mt-2"
              >
                <div>
                  <label
                    htmlFor="upload-image"
                    className="bg-neutral-200 hover:bg-neutral-400 border border-neutral-600 border-dashed py-2 px-4 rounded text-xs text-neutral-700 cursor-pointer"
                  >
                    {changeImage.name ? changeImage.name : "Select Image"}
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="upload-image"
                    onChange={(e: any) => {
                      e.preventDefault();
                      setChangeImage(e.currentTarget.files[0]);
                    }}
                    hidden
                  />
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  classname="border border-indigo-600 text-xs md:text-md"
                >
                  {isLoading === "avatar" ? "Uploading..." : "Change Avatar"}
                </Button>
              </form>
            </div>

            <div className="flex flex-col justify-between items-center md:items-start mt-2">
              <h1 className="text-xl  md:text-3xl lg:text-4xl text-neutral-700 font-semibold mb-2">
                {profile.fullname && profile.fullname.toUpperCase()}
              </h1>
              <p className="text-md md:text-lg text-gray-600 mb-2">
                {profile.email}
              </p>
              <span className="text-smfont-medium bg-indigo-700 px-4 py-1 rounded-xl text-white">
                {profile.role &&
                  profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2 h-max">
        <div className="md:w-2/3 bg-white rounded-lg border border-neutral-200 p-5 md:p-10">
          <h1 className="text-xl text-neutral-800 font-semibold mb-3">
            Profile Information
          </h1>
          <div>
            <form onSubmit={handleChangeProfile}>
              <Input
                label="Fullname"
                name="fullname"
                type="text"
                defaultValue={profile.fullname}
              />
              <Input
                label="Phone"
                name="phone"
                type="number"
                defaultValue={profile.phone}
              />

              <div className="w-full flex justify-end">
                <Button type="submit" classname="md:px-5">
                  <span>
                    {isLoading === "profile" ? "Loading..." : "Update Profile"}
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="md:w-1/3 bg-white rounded-lg border border-neutral-200 p-5 md:p-10">
          <h1 className="text-xl text-neutral-800 font-semibold mb-3">
            Reset Password
          </h1>
          <form onSubmit={handleChangePassword}>
            <Input
              label="Current Password"
              name="old-password"
              type="password"
              placeholder="Enter your current password"
            />
            <Input
              label="New Password"
              name="new-password"
              type="password"
              placeholder="Enter your new password"
            />
            <div className="w-full flex justify-end">
              <Button type="submit">
                {isLoading === "password" ? "Loading..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileMemberView;

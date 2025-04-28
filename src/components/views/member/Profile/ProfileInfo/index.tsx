/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/ui/Button";
import { User } from "@/types/user.type";
import Image from "next/image";
import { Dispatch, FormEvent, SetStateAction } from "react";

type Proptypes = {
  profile: User;
  isLoading: string;
  handleChangeProfilePicture: (event: FormEvent<HTMLFormElement>) => void;
  avatar: File;
  setAvatar: Dispatch<SetStateAction<File>>;
};

const ProfileInfo = (props: Proptypes) => {
  const { profile, isLoading, handleChangeProfilePicture, avatar, setAvatar } =
    props;
  return (
    <div className="flex md:flex-row flex-col justify-start items-center gap-5 bg-white mb-5 p-3 md:p-5 border border-neutral-200 rounded-lg w-full">
      <div className="flex flex-col justify-center items-start p-5 w-full">
        <div className="flex md:flex-row flex-col items-center md:gap-10 w-full">
          <div className="flex flex-col items-center">
            <div className="mb-2 rounded-full w-20 md:w-32 h-20 md:h-32 overflow-hidden hover:scale-105 transition-all duration-100 ease-in-out">
              {profile.image ? (
                <Image
                  src={profile.image}
                  alt="profile"
                  className="w-full object-cover"
                  width={100}
                  height={100}
                />
              ) : (
                <div className="flex justify-center items-center bg-gray-200 w-full h-full">
                  <p className="font-medium text-indigo-600 text-5xl">
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
                  className="group relative bg-neutral-200 hover:bg-neutral-400 px-4 py-2 border border-neutral-600 border-dashed rounded text-neutral-700 text-xs cursor-pointer"
                >
                  {avatar.name
                    ? avatar.name.slice(0, 10) + "..."
                    : "Select Image"}

                  {avatar.name && (
                    <div className="hidden group-hover:block -top-12 left-0 group-hover:absolute bg-neutral-800 px-2 py-1 rounded text-white text-xs">
                      {avatar.name}
                    </div>
                  )}
                </label>

                <input
                  type="file"
                  name="image"
                  id="upload-image"
                  onChange={(e: any) => {
                    e.preventDefault();
                    setAvatar(e.currentTarget.files[0]);
                  }}
                  hidden
                />
              </div>

              <Button
                type="submit"
                variant="secondary"
                classname="border border-primary text-xs md:text-md"
              >
                {isLoading === "avatar" ? "Uploading..." : "Change Avatar"}
              </Button>
            </form>
          </div>

          <div className="flex flex-col justify-between items-center md:items-start mt-2">
            <h1 className="mb-2 font-semibold text-neutral-700 text-xl md:text-3xl lg:text-4xl">
              {profile.fullname && profile.fullname.toUpperCase()}
            </h1>
            <p className="mb-2 text-gray-600 text-md md:text-lg">
              {profile.email}
            </p>
            <span className="bg-primary px-4 py-1 rounded-xl font-medium text-white text-sm">
              {profile.role &&
                profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;

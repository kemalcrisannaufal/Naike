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
};

const ProfileMemberView = (props: Proptypes) => {
  const { profile, setProfile, session } = props;
  const [changeImage, setChangeImage] = useState<any>({});

  const handleChangeProfilePicture = (e: any) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
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
              setProfile({ ...profile, image: newImageUrl });
              setChangeImage({});
              e.target[0].value = null;
            }
          } else {
            setChangeImage({});
            e.target[0].value = null;
          }
        }
      );
    }
  };

  return (
    <div className="p-5 md:p-10">
      <div className="w-full bg-white rounded-lg p-3 md:p-5 flex flex-col md:flex-row justify-start items-center gap-5 shadow-lg border border-neutral-200 mb-5">
        <div className="w-full md:w-1/7 flex flex-col justify-center items-center">
          <div className="h-20 w-20 md:w-28 md:h-28 rounded-full overflow-hidden shadow-lg mb-2">
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
                  {profile.fullname && profile.fullname.charAt(0).toUpperCase()}
                </p>
              </div>
            )}
          </div>
          <form
            onSubmit={handleChangeProfilePicture}
            className="flex flex-col items-center gap-3 mt-2"
          >
            <div className="relative">
              <label
                htmlFor="upload-image"
                className="bg-neutral-200 hover:bg-neutral-400 border border-neutral-600 border-dashed py-2 px-4 rounded text-xs text-neutral-700 cursor-pointer"
              >
                {changeImage.name ? changeImage.name : "Select Image (Max 1MB)"}
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
              classname="border border-indigo-600"
            >
              Change Avatar
            </Button>
          </form>
        </div>

        <div className="flex flex-col justify-between items-center md:items-start">
          <h1 className="text-2xl md:text-3xl text-neutral-800 font-semibold">
            {profile.fullname}
          </h1>
          <p className="text-sm text-neutral-600 font-medium">
            {profile.email}
          </p>
        </div>
      </div>
      <div className="w-full bg-white rounded-lg shadow-xl border border-neutral-200 p-5">
        <h1 className="text-xl text-neutral-800 font-semibold mb-3">
          Profile Information
        </h1>
        <div>
          <form action="">
            <Input
              label="Nama Lengkap"
              name="fullname"
              type="text"
              defaultValue={profile.fullname}
              disabled
            />
            <Input
              label="Email"
              name="email"
              type="email"
              defaultValue={profile.email}
              disabled
            />
            <Input
              label="Nomor Handphone"
              name="phone"
              type="number"
              defaultValue={profile.phone}
              disabled
            />
            <Input
              label="Password"
              name="password"
              type="password"
              defaultValue={profile.password}
              disabled
            />

            <div className="w-full flex justify-end">
              <Button type="submit">
                <span>Update Profile</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileMemberView;

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { User } from "@/types/user.type";
import { FormEvent } from "react";

type Proptypes = {
  handleChangeProfile: (event: FormEvent<HTMLFormElement>) => void;
  profile: User;
  isLoading: string;
};

const ProfileDetail = (props: Proptypes) => {
  const { handleChangeProfile, profile, isLoading } = props;
  return (
    <div className="bg-white p-5 md:p-10 border border-neutral-200 rounded-lg md:w-2/3">
      <h1 className="mb-3 font-semibold text-neutral-800 text-xl">
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
            placeholder="Enter your phone number"
          />

          <div className="flex justify-end w-full">
            <Button type="submit" classname="md:px-5">
              <span>
                {isLoading === "profile" ? "Loading..." : "Update Profile"}
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileDetail;

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { User } from "@/types/user.type";
import { FormEvent } from "react";

type Proptypes = {
  handleChangePassword: (event: FormEvent<HTMLFormElement>) => void;
  profile: User;
  isLoading: string;
};

const ProfilePassword = (props: Proptypes) => {
  const { handleChangePassword, profile, isLoading } = props;
  return (
    <div className="bg-white p-5 md:p-10 border border-neutral-200 rounded-lg md:w-1/3">
      <h1 className="mb-3 font-semibold text-neutral-800 text-xl">
        Reset Password
      </h1>
      <form onSubmit={handleChangePassword}>
        <Input
          label="Current Password"
          name="old-password"
          type="password"
          placeholder="Enter your current password"
          disabled={isLoading === "password" || profile.type === "google"}
        />
        <Input
          label="New Password"
          name="new-password"
          type="password"
          placeholder="Enter your new password"
          disabled={isLoading === "password" || profile.type === "google"}
        />
        <div className="flex justify-end w-full">
          <Button
            type="submit"
            disabled={isLoading === "password" || profile.type === "google"}
          >
            {isLoading === "password" ? "Loading..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePassword;

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const ProfileMemberViewSkeleton = () => {
  return (
    <div className="p-5 md:px-32 md:py-10">
      <div className="flex md:flex-row flex-col justify-start items-center gap-5 bg-white mb-5 p-3 md:p-5 border border-neutral-200 rounded-lg w-full">
        <div className="flex flex-col justify-center items-start p-5 w-full">
          <div className="flex md:flex-row flex-col items-center md:gap-10 w-full">
            <div className="flex flex-col items-center">
              <div className="bg-neutral-200 mb-2 rounded-full w-20 md:w-32 h-20 md:h-32 overflow-hidden hover:scale-105 transition-all animate-pulse duration-100 ease-in-out"></div>
              <form className="flex md:flex-col items-center gap-3 mt-2">
                <div>
                  <label className="bg-neutral-200 hover:bg-neutral-400 px-4 py-2 border border-neutral-600 border-dashed rounded text-neutral-700 text-xs cursor-pointer">
                    {"Select Image"}
                  </label>
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  classname="border border-primary text-xs md:text-md"
                  disabled
                >
                  Change Avatar
                </Button>
              </form>
            </div>

            <div className="flex flex-col justify-between items-center md:items-start mt-2 w-full">
              <div className="bg-neutral-200 mb-2 w-2/3 h-10 md:h-12 animate-pulse" />
              <div className="bg-neutral-200 mb-2 w-1/3 h-6 animate-pulse" />
              <div className="flex justify-center items-center bg-primary mb-2 px-4 py-1 rounded-xl w-20 h-8 font-medium text-white text-xs">
                <p>Loading..</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex md:flex-row flex-col gap-2 h-max">
        <div className="bg-white p-5 md:p-10 border border-neutral-200 rounded-lg md:w-2/3">
          <h1 className="mb-3 font-semibold text-neutral-800 text-xl">
            Profile Information
          </h1>
          <div>
            <Input label="Fullname" name="fullname" type="text" skeleton />
            <Input label="Phone" name="phone" type="number" skeleton />
            <div className="flex justify-end w-full">
              <Button type="button" classname="md:px-5" disabled>
                <span>Update Profile</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 md:p-10 border border-neutral-200 rounded-lg md:w-1/3">
          <h1 className="mb-3 font-semibold text-neutral-800 text-xl">
            Reset Password
          </h1>
          <Input
            label="Current Password"
            name="old-password"
            type="password"
            skeleton
          />
          <Input
            label="New Password"
            name="new-password"
            type="password"
            skeleton
          />
          <div className="flex justify-end w-full">
            <Button disabled>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMemberViewSkeleton;

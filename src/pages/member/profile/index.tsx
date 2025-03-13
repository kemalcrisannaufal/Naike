/* eslint-disable @typescript-eslint/no-explicit-any */
import ProfileMemberView from "@/components/views/member/Profile";
import { userServices } from "@/services/user";
import { User } from "@/types/user.type";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Proptypes = {
  setToaster: Dispatch<SetStateAction<object>>;
};

const ProfileMemberPage = (props: Proptypes) => {
  const { setToaster } = props;
  const [profile, setProfile] = useState<User | any>({});
  const session: any = useSession();

  useEffect(() => {
    const getProfile = async () => {
      if (session.data?.accessToken && Object.keys(profile).length === 0) {
        const { data } = await userServices.getProfile(
          session.data?.accessToken
        );
        setProfile(data.data);
      }
    };
    getProfile();
  }, [profile, session]);
  return (
    <>
      {profile && (
        <ProfileMemberView
          profile={profile}
          setProfile={setProfile}
          session={session}
          setToaster={setToaster}
        />
      )}
    </>
  );
};

export default ProfileMemberPage;

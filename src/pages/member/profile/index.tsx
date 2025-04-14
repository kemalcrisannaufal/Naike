/* eslint-disable @typescript-eslint/no-explicit-any */
import ProfileMemberView from "@/components/views/member/Profile";
import ProfileMemberViewSkeleton from "@/components/views/member/Profile/skeleton";
import { userServices } from "@/services/user";
import { User } from "@/types/user.type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ProfileMemberPage = () => {
  const [profile, setProfile] = useState<User | any>({});
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();

  useEffect(() => {
    setIsLoading(true);
    const getProfile = async () => {
      if (session.data?.accessToken && Object.keys(profile).length === 0) {
        const { data } = await userServices.getProfile();
        setProfile(data.data);
      }
    };
    getProfile();
    if (Object.keys(profile).length > 0) {
      setIsLoading(false);
    }
  }, [profile, session]);
  return (
    <>
      {isLoading ? (
        <ProfileMemberViewSkeleton />
      ) : (
        <ProfileMemberView profile={profile} setProfile={setProfile} />
      )}
    </>
  );
};

export default ProfileMemberPage;

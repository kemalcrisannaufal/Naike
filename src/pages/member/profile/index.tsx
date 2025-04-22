import { useProfile } from "@/components/hooks/useProfile";
import ProfileMemberView from "@/components/views/member/Profile";
import ProfileMemberViewSkeleton from "@/components/views/member/Profile/skeleton";
import Head from "next/head";

const ProfileMemberPage = () => {
  const { profile, setProfile, isLoading } = useProfile();

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      {isLoading ? (
        <ProfileMemberViewSkeleton />
      ) : (
        <ProfileMemberView profile={profile} setProfile={setProfile} />
      )}
    </>
  );
};

export default ProfileMemberPage;

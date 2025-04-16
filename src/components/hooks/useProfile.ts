/* eslint-disable @typescript-eslint/no-explicit-any */
import { userServices } from "@/services/user";
import { User } from "@/types/user.type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useProfile = () => {
  const [profile, setProfile] = useState<User | any>({});
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();

  useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true);
      if (session.data?.accessToken && Object.keys(profile).length === 0) {
        const { data } = await userServices.getProfile();
        setProfile(data.data);
      }
      setIsLoading(false);
    };
    getProfile();
  }, [profile, session]);

  return { profile, setProfile, isLoading };
};

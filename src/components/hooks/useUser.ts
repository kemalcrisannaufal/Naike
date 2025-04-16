import { userServices } from "@/services/user";
import { User } from "@/types/user.type";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllUsers = async () => {
      setIsLoading(true);
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
      setIsLoading(false);
    };
    getAllUsers();
  }, []);

  return { users, setUsers, isLoading };
};

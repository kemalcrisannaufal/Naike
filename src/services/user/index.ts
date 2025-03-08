/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/lib/axios/instance";

export const userServices = {
  getAllUsers: () => instance.get("/api/user"),
  updateUser: (id: string, data: any) =>
    instance.put("/api/user", { id, data }),
  deleteUser: (id: string) => instance.delete(`/api/user/${id}`),
};

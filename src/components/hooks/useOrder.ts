/* eslint-disable @typescript-eslint/no-explicit-any */
import orderServices from "@/services/orders";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useOrder = () => {
  const [orders, setOrders] = useState<any>([]);
  const session: any = useSession();

  useEffect(() => {
    const getOrders = async () => {
      if (session.data?.accessToken) {
        const { data } = await orderServices.getOrders();

        if (data.data && data.data.length > 0) {
          setOrders(data.data);
        }
      }
    };
    getOrders();
  }, [session]);
  return { orders, setOrders };
};

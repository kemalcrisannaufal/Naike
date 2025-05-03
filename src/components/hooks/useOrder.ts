/* eslint-disable @typescript-eslint/no-explicit-any */
import orderServices from "@/services/orders";
import productServices from "@/services/products";
import { Order } from "@/types/orders.type";
import { Product } from "@/types/product.type";
import { sortDataByDate } from "@/utils/sort";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [productOrders, setProductOrders] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const session: any = useSession();

  useEffect(() => {
    const getOrders = async () => {
      setIsLoading(true);
      if (session.data?.accessToken) {
        const { data } = await orderServices.getOrders();
        const sortedOrders = sortDataByDate(data.data, "created_at");
        setOrders(sortedOrders);

        if (sortedOrders && sortedOrders.length > 0) {
          const allItems = sortedOrders.flatMap((order: Order) => order.items);
          const uniqueProductIds = [
            ...new Set(allItems.map((item: any) => item.productId)),
          ];

          const productPromises = uniqueProductIds.map((id) =>
            productServices.getProduct(id as string)
          );

          const productsData = await Promise.all(productPromises);
          const productList = productsData.map((response, index) => {
            return {
              ...response.data.data,
              id: uniqueProductIds[index],
            };
          });
          setProductOrders(productList);
        }
      }
      setIsLoading(false);
    };
    getOrders();
  }, [session]);

  return { orders, setOrders, productOrders, isLoading };
};

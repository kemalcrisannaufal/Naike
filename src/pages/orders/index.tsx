/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOrder } from "@/components/hooks/useOrder";
import OrdersView from "@/components/views/Orders";
import productServices from "@/services/products";
import Head from "next/head";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const { orders } = useOrder();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      if (orders && orders.length > 0) {
        const allItems = orders.flatMap((order: any) => order.items);
        const uniqueProductIds = [
          ...new Set(allItems.map((item: any) => item.productId)),
        ];

        const productPromises = uniqueProductIds.map((id) =>
          productServices.getProduct(id as string)
        );

        const productsData = await Promise.all(productPromises);
        setProducts(productsData);
      }
    };
    getProducts();
  }, [orders]);

  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <OrdersView orders={orders} products={products} />
    </>
  );
};

export default OrdersPage;

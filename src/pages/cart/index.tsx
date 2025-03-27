/* eslint-disable @typescript-eslint/no-explicit-any */
import CartView from "@/components/views/cart";
import productServices from "@/services/products";
import { userServices } from "@/services/user";
import { Cart } from "@/types/cart.type";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import CartViewSkeleton from "@/components/views/cart/Skeleton";

const CartPage = () => {
  const [cart, setCart] = useState<Cart[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();

  useEffect(() => {
    const getCart = async () => {
      setIsLoading(true);
      if (session.data?.accessToken) {
        const { data } = await userServices.getCart(session.data?.accessToken);
        setCart(data.data);

        if (data.data && data.data.length > 0) {
          const uniqueProductIds = new Set();
          const products = await Promise.all(
            data.data
              .filter((item: Cart) => {
                if (uniqueProductIds.has(item.productId)) return false;
                uniqueProductIds.add(item.productId);
                return true;
              })
              .map(async (item: Cart) => {
                const { data } = await productServices.getProduct(
                  item.productId
                );
                data.data.id = item.productId;
                return data.data;
              })
          );
          setProducts(products);
        }
        setIsLoading(false);
      }
    };
    getCart();
  }, [session]);
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      {isLoading ? (
        <CartViewSkeleton />
      ) : (
        <CartView cart={cart} products={products} />
      )}
    </>
  );
};
export default CartPage;

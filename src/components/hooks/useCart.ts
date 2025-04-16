/* eslint-disable @typescript-eslint/no-explicit-any */
import productServices from "@/services/products";
import { userServices } from "@/services/user";
import { Cart } from "@/types/cart.type";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useCart = () => {
  const session: any = useSession();
  const [cart, setCart] = useState<Cart[]>([]);
  const [productsCart, setProductsCart] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCart = async () => {
      setIsLoading(true);

      if (session.data?.accessToken) {
        const { data } = await userServices.getCart();
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
                if (!data.data) return null;
                data.data.id = item.productId;
                return data.data;
              })
          );
          setProductsCart(products);
        }
        setIsLoading(false);
      }
    };
    getCart();
  }, [session]);

  return { cart, productsCart, isLoading, setCart };
};

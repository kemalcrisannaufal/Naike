/* eslint-disable @typescript-eslint/no-explicit-any */
import productServices from "@/services/products";
import { userServices } from "@/services/user";
import { Favorite } from "@/types/favorite.type";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useFavorite = () => {
  const session: any = useSession();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [productsFavorite, setProductsFavorite] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getFavorite = async () => {
      setIsLoading(true);

      if (session.data?.accessToken) {
        const { data } = await userServices.getFavorite();
        setFavorites(data.data);

        if (data.data && data.data.length > 0) {
          const uniqueProductIds = new Set();
          const products = await Promise.all(
            data.data
              .filter((item: Favorite) => {
                if (uniqueProductIds.has(item.productId)) return false;
                uniqueProductIds.add(item.productId);
                return true;
              })
              .map(async (item: Favorite) => {
                const { data } = await productServices.getProduct(
                  item.productId
                );
                if (!data.data) return null;
                data.data.id = item.productId;
                return data.data;
              })
          );
          setProductsFavorite(products);
        }
        setIsLoading(false);
      }
    };
    getFavorite();
  }, [session]);

  return { favorites, productsFavorite, isLoading, setFavorites };
};

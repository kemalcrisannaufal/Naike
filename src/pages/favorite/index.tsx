/* eslint-disable @typescript-eslint/no-explicit-any */
import FavoriteView from "@/components/views/favorite";
import productServices from "@/services/products";
import { userServices } from "@/services/user";
import { Cart } from "@/types/cart.type";
import { Favorite } from "@/types/favorite.type";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const FavoritePage = () => {
  const session: any = useSession();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart[]>([]);

  useEffect(() => {
    const getFavourite = async () => {
      if (session?.data?.accessToken) {
        const { data } = await userServices.getFavorite(
          session?.data?.accessToken
        );

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
          setProducts(products);
        }
        setFavorites(data.data);
      }
    };

    getFavourite();
  }, [session]);

  useEffect(() => {
    const getCart = async () => {
      if (session?.data?.accessToken) {
        const { data } = await userServices.getCart(session?.data?.accessToken);
        setCart(data.data);
      }
    };

    getCart();
  }, [session?.data?.accessToken]);

  return (
    <>
      <FavoriteView
        favorites={favorites}
        products={products}
        session={session}
        setFavorites={setFavorites}
        cart={cart}
        setCart={setCart}
      />
    </>
  );
};

export default FavoritePage;

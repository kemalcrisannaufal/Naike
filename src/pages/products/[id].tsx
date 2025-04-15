/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/router";
import ProductDetailView from "@/components/views/productDetail";
import { useEffect, useState } from "react";
import { Product } from "@/types/product.type";
import productServices from "@/services/products";
import ProductDetailSkeleton from "@/components/views/productDetail/ProductDetailSekeleton";
import { userServices } from "@/services/user";
import { Favorite } from "@/types/favorite.type";
import { Cart } from "@/types/cart.type";
import { useSession } from "next-auth/react";

const ProductDetailPage = () => {
  const { id } = useRouter().query;
  const [product, setProduct] = useState<Product>({} as Product);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<Cart[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const session: any = useSession();

  useEffect(() => {
    const getProduct = async (id: string) => {
      setIsLoading(true);
      const { data } = await productServices.getProduct(id);
      setProduct(data.data);
      setIsLoading(false);
    };
    getProduct(id as string);
  }, [id]);

  useEffect(() => {
    const getCart = async () => {
      if (session.data?.accessToken) {
        const { data } = await userServices.getCart();
        setCart(data.data);
      }
    };
    getCart();
  }, [session]);

  useEffect(() => {
    const getFavorite = async () => {
      if (session.data?.accessToken) {
        const { data } = await userServices.getFavorite();
        setFavorites(data.data);
      }
    };
    getFavorite();
  }, [session]);

  return (
    <>
      {isLoading || !product ? (
        <ProductDetailSkeleton />
      ) : (
        <ProductDetailView
          product={product}
          productId={id as string}
          cart={cart}
          setCart={setCart}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      )}
    </>
  );
};

export default ProductDetailPage;

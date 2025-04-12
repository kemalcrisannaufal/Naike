/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/router";
import ProductDetailView from "@/components/views/productDetail";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Product } from "@/types/product.type";
import productServices from "@/services/products";
import ProductDetailSkeleton from "@/components/views/productDetail/ProductDetailSekeleton";
import { userServices } from "@/services/user";
import { useSession } from "next-auth/react";

type Proptypes = {
  setToaster: Dispatch<SetStateAction<object>>;
};

const ProductDetailPage = (props: Proptypes) => {
  const { setToaster } = props;
  const { id } = useRouter().query;
  const [product, setProduct] = useState<Product>({} as Product);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
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
        const { data } = await userServices.getCart(session.data?.accessToken);
        setCart(data.data);
      }
    };
    getCart();
  }, [session]);

  useEffect(() => {
    const getFavorite = async () => {
      if (!session.data?.accessToken) return;
      const { data } = await userServices.getFavorite(
        session.data?.accessToken
      );
      setFavorites(data.data);
    };
    getFavorite();
  }, [session.data?.accessToken]);

  return (
    <>
      {isLoading || !product ? (
        <ProductDetailSkeleton />
      ) : (
        <ProductDetailView
          product={product}
          setToaster={setToaster}
          productId={id as string}
          cart={cart}
          favorites={favorites}
        />
      )}
    </>
  );
};

export default ProductDetailPage;

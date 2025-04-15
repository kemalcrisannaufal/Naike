import CartView from "@/components/views/cart";
import productServices from "@/services/products";
import { userServices } from "@/services/user";
import { Cart } from "@/types/cart.type";
import { Product } from "@/types/product.type";
import Head from "next/head";
import { useEffect, useState } from "react";
import CartViewSkeleton from "@/components/views/cart/Skeleton";
import { Favorite } from "@/types/favorite.type";

const CartPage = () => {
  const [cart, setCart] = useState<Cart[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const getCart = async () => {
      setIsLoading(true);

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
              const { data } = await productServices.getProduct(item.productId);
              if (!data.data) return null;
              data.data.id = item.productId;
              return data.data;
            })
        );
        setProducts(products);
      }
      setIsLoading(false);
    };
    getCart();
  }, []);

  useEffect(() => {
    const getFavourite = async () => {
      const { data } = await userServices.getFavorite();
      setFavorites(data.data);
    };

    getFavourite();
  }, []);

  const getSubtotal = () => {
    const subtotal = cart.reduce((acc, item) => {
      const product = products.find(({ id }) => id === item.productId);
      return acc + (product?.price ?? 0) * item.qty;
    }, 0);
    return subtotal;
  };

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      {isLoading ? (
        <CartViewSkeleton />
      ) : (
        <CartView
          cart={cart}
          setCart={setCart}
          favorites={favorites}
          setFavorites={setFavorites}
          products={products}
          subtotal={getSubtotal()}
        />
      )}
    </>
  );
};
export default CartPage;

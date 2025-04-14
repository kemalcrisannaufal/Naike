/* eslint-disable @typescript-eslint/no-explicit-any */
import CartView from "@/components/views/cart";
import productServices from "@/services/products";
import { userServices } from "@/services/user";
import { Cart } from "@/types/cart.type";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CartViewSkeleton from "@/components/views/cart/Skeleton";

const CartPage = () => {
  const [cart, setCart] = useState<Cart[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();

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

  const getSubtotal = () => {
    const subtotal = cart.reduce((acc, item) => {
      const product = products.find(({ id }) => id === item.productId);
      return acc + (product?.price ?? 0) * item.qty;
    }, 0);
    return subtotal;
  };

  const handleDelete = async (id: string, size: string) => {
    const newCart = cart.filter(
      (item) => !(item.productId === id && item.size === size)
    );

    const data = {
      cart: newCart,
      updated_at: new Date(),
    };
    const response = await userServices.updateCart(data);

    if (response.status === 200) {
      setCart(newCart);
    }
  };

  const handleOnChangeSize = async (
    selectedSize: string,
    productId: string
  ) => {
    const idxCart = cart.findIndex((item) => item.productId === productId);
    const newCart = cart.map((item, idx) => {
      if (idx === idxCart) {
        return { ...item, size: selectedSize };
      }
      return item;
    });

    const response = await userServices.updateCart({
      cart: newCart,
      updated_at: new Date(),
    });

    if (response.status === 200) {
      setCart(newCart);
    }
  };

  const handleOnClickQty = async (
    size: string,
    qty: number,
    type: string,
    productId: string,
    setCartItemQty: Dispatch<SetStateAction<number>>
  ) => {
    const product = products.find(({ id }) => id === productId);
    const maxQty =
      product!.stock.find(
        (item: { size: string; qty: number }) => item.size === size
      )!.qty || 1;
    let nextQty = qty;
    if (type === "add") {
      if (qty < maxQty) {
        nextQty = qty + 1;
      }
    } else if (type === "subtract") {
      if (qty > 1) {
        nextQty = qty - 1;
      }
    }

    const newCart = cart.map((item) => {
      if (item.productId === product!.id) {
        return { ...item, qty: nextQty };
      }
      return item;
    });

    const response = await userServices.updateCart({
      cart: newCart,
      updated_at: new Date(),
    });

    if (response.status === 200) {
      setCart(newCart);
      setCartItemQty(nextQty);
    }
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
          products={products}
          session={session}
          setCart={setCart}
          handleDelete={handleDelete}
          handleOnChangeSize={handleOnChangeSize}
          handleOnClickQty={handleOnClickQty}
          subtotal={getSubtotal()}
        />
      )}
    </>
  );
};
export default CartPage;

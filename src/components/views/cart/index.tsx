import Title from "@/components/ui/Text/Title";
import { Cart } from "@/types/cart.type";
import { Product } from "@/types/product.type";
import { Dispatch, SetStateAction, useContext } from "react";
import CartCard from "./Card";
import CartSummary from "./CartSummary";
import { userServices } from "@/services/user";
import { ToasterContext } from "@/contexts/ToasterContext";
import CartViewSkeleton from "./Skeleton";
import { useFavorite } from "@/components/hooks/useFavorite";
import { useRouter } from "next/router";

type Proptypes = {
  cart: Cart[];
  setCart: Dispatch<SetStateAction<Cart[]>>;
  productsCart: Product[];
  subtotal: number;
  isLoading: boolean;
};

const CartView = (props: Proptypes) => {
  const { cart, productsCart, subtotal, setCart, isLoading } = props;
  const { setToaster } = useContext(ToasterContext);
  const { favorites, setFavorites } = useFavorite();
  const { push } = useRouter();

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
      setToaster({ variant: "success", message: "Update cart successfully!" });
    }
  };

  const handleOnClickQty = async (
    size: string,
    qty: number,
    type: string,
    productId: string,
    setCartItemQty: Dispatch<SetStateAction<number>>
  ) => {
    const product = productsCart.find(({ id }) => id === productId);
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
      setToaster({
        variant: "success",
        message: "Update cart successfully!",
      });
    }
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
      setToaster({
        variant: "success",
        message: "Update cart successfully!",
      });
    }
  };

  return isLoading ? (
    <CartViewSkeleton />
  ) : (
    <div className="p-5 md:px-20 lg:px-48 lg:pt-12 lg:pb-10">
      <Title>Cart</Title>
      {cart && cart.length > 0 ? (
        <div className="flex lg:flex-row flex-col-reverse lg:gap-5 mt-3 lg:mt-5">
          <div className="w-full lg:w-2/3">
            {cart.map((cartItem, index) => {
              const product = productsCart.find(
                ({ id }) => id === cartItem.productId
              );
              return (
                <CartCard
                  key={index}
                  product={product}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  cartItem={cartItem}
                  handleDelete={handleDelete}
                  handleOnChangeSize={handleOnChangeSize}
                  handleOnClickQty={handleOnClickQty}
                />
              );
            })}
          </div>
          <div className="w-full lg:w-1/3">
            <CartSummary subTotal={subtotal} onClick={() => push("checkout")} />
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-neutral-200 mt-3 p-3 lg:pt-5 w-full">
            <p>
              Your cart is empty. Start adding your favorite products to your
              cart! 😊🛒
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;

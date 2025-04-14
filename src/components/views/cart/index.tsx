/* eslint-disable @typescript-eslint/no-explicit-any */
import Title from "@/components/ui/Text/Title";
import { Cart } from "@/types/cart.type";
import { Product } from "@/types/product.type";
import { Dispatch, SetStateAction } from "react";
import CartCard from "./Card";
import CartSummary from "./CartSummary";

type Proptypes = {
  cart: Cart[];
  setCart: Dispatch<SetStateAction<Cart[]>>;
  products: Product[];
  session: any;
  handleDelete: (id: string, size: string) => void;
  handleOnChangeSize: (selectedSize: string, productId: string) => void;
  handleOnClickQty: (
    size: string,
    qty: number,
    type: string,
    productId: string,
    setCartItemQty: Dispatch<SetStateAction<number>>
  ) => void;
  subtotal: number;
};

const CartView = (props: Proptypes) => {
  const {
    cart,
    products,
    handleDelete,
    handleOnChangeSize,
    handleOnClickQty,
    subtotal,
  } = props;

  return (
    <div className="p-5 md:px-20 lg:px-48 lg:pt-5 lg:pb-10">
      <Title>Cart</Title>
      {cart && cart.length > 0 ? (
        <div className="flex lg:flex-row flex-col-reverse lg:gap-5 mt-3 lg:mt-5">
          <div className="w-full lg:w-2/3">
            {cart.map((cartItem, index) => {
              const product = products.find(
                ({ id }) => id === cartItem.productId
              );
              return (
                <CartCard
                  key={index}
                  product={product}
                  cartItem={cartItem}
                  handleDelete={handleDelete}
                  handleOnChangeSize={handleOnChangeSize}
                  handleOnClickQty={handleOnClickQty}
                />
              );
            })}
          </div>
          <CartSummary subTotal={subtotal} />
        </div>
      ) : (
        <div>
          <div className="bg-neutral-200 mt-3 lg:mt-5 p-3 w-full">
            <p>Your cart is empty. Start adding your favorite products! 😊🛒</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;

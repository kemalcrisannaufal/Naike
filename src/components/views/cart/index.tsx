/* eslint-disable @typescript-eslint/no-explicit-any */
import Title from "@/components/ui/Text/Title";
import { userServices } from "@/services/user";
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
};

const CartView = (props: Proptypes) => {
  const { cart, setCart, products, session } = props;

  const getSubtotal = () => {
    const subtotal = cart.reduce((acc, item) => {
      const product = products.find(({ id }) => id === item.productId);
      return acc + (product?.price ?? 0) * item.qty;
    }, 0);
    return subtotal;
  };

  const handleDelete = async (id: string) => {
    const newCart = cart.filter((item) => item.productId != id);
    const data = {
      cart: newCart,
      updated_at: new Date(),
    };
    const response = await userServices.updateCart(
      session.data?.accessToken,
      data
    );

    if (response.status === 200) {
      setCart(newCart);
    }
  };

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
                  cart={cart}
                  product={product}
                  session={session}
                  setCart={setCart}
                  handleDelete={handleDelete}
                  cartItem={cartItem}
                />
              );
            })}
          </div>
          <CartSummary subTotal={getSubtotal()} />
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

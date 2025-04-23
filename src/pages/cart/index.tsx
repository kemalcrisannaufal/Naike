import CartView from "@/components/views/cart";
import Head from "next/head";
import { useCart } from "@/components/hooks/useCart";

const CartPage = () => {
  const { cart, productsCart, isLoading, setCart } = useCart();

  const getSubtotal = () => {
    if (cart && cart.length > 0) {
      const subtotal = cart.reduce((acc, item) => {
        const product = productsCart.find(({ id }) => id === item.productId);
        return acc + (product?.price ?? 0) * item.qty;
      }, 0);
      return subtotal;
    } else {
      return 0;
    }
  };

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <CartView
        cart={cart}
        isLoading={isLoading}
        setCart={setCart}
        productsCart={productsCart}
        subtotal={getSubtotal()}
      />
    </>
  );
};
export default CartPage;

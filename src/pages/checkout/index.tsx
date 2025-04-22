import { useCart } from "@/components/hooks/useCart";
import { useProfile } from "@/components/hooks/useProfile";
import CheckoutView from "@/components/views/Checkout";
import Head from "next/head";

const CheckoutPage = () => {
  const { cart, productsCart, isLoading: isLoadingCart } = useCart();
  const { profile, setProfile, isLoading: isLoadingProfile } = useProfile();
  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <CheckoutView
        cart={cart}
        productsCart={productsCart}
        profile={profile}
        setProfile={setProfile}
        isLoading={isLoadingCart || isLoadingProfile}
      />
    </>
  );
};

export default CheckoutPage;

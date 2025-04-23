import Title from "@/components/ui/Text/Title";
import { Cart } from "@/types/cart.type";
import { Product } from "@/types/product.type";
import CheckoutCard from "./Card";
import { User } from "@/types/user.type";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Address } from "@/types/address.type";

import AddressCard from "../../fragments/Address/AddressCard";
import { userServices } from "@/services/user";
import { ToasterContext } from "@/contexts/ToasterContext";
import CheckoutViewSkeleton from "./skeleton";
import CartSummary from "../cart/CartSummary";
import ModalAddress from "@/components/fragments/Address/ModalAddress";

type Proptypes = {
  cart: Cart[];
  productsCart: Product[];
  profile: User;
  setProfile: Dispatch<SetStateAction<User>>;
  isLoading: boolean;
};

const CheckoutView = (props: Proptypes) => {
  const { cart, productsCart, profile, setProfile, isLoading } = props;
  const [address, setAddress] = useState<Address>();
  const [modalAddress, setModalAddress] = useState(false);
  const { setToaster } = useContext(ToasterContext);

  const getSubtotal = () => {
    const subtotal = cart.reduce((acc, item) => {
      const product = productsCart.find(({ id }) => id === item.productId);
      return acc + (product?.price ?? 0) * item.qty;
    }, 0);
    return subtotal;
  };

  const onAddAddress = async (data: Address[]) => {
    const result = await userServices.updateProfile({
      address: data,
    });

    if (result.status === 200) {
      setModalAddress(false);
      profile.address = data;
      setToaster({
        variant: "success",
        message: "Successfully update address!",
      });
    } else {
      setToaster({
        variant: "error",
        message: "Failed to update address. Please try again later!",
      });
    }
  };

  useEffect(() => {
    if (profile.address) {
      setAddress(profile.address.find((item) => item.isMain));
    }
  }, [profile.address]);

  return (
    <>
      {!isLoading ? (
        <div className="p-5 md:px-20 lg:px-48 lg:pt-5 lg:pb-10">
          <Title>Checkout</Title>

          <div className="lg:flex gap-5 w-full">
            <div className="mt-3 lg:mt-5 p-2 w-full lg:w-2/3">
              {profile.address && profile.address?.length > 0 ? (
                <AddressCard
                  address={address}
                  addressList={profile.address}
                  selectedAddress={address}
                  onClick={() => setModalAddress(true)}
                  setProfile={setProfile}
                />
              ) : (
                <div
                  className={`block bg-neutral-100 p-3 border border-neutral-200 rounded-lg  `}
                >
                  <p>
                    Your address is empty. Please add your address{" "}
                    <button
                      onClick={() => setModalAddress(true)}
                      className="cursor-pointer"
                    >
                      <span className="font-semibold underline">here!</span>
                    </button>
                  </p>
                </div>
              )}

              <p className="mt-3 lg:mt-5 font-semibold text-lg">
                ITEMS ({cart.length})
              </p>
              {cart.map((item, index) => {
                const product = productsCart.find(
                  (product) => product.id === item.productId
                );
                return (
                  <CheckoutCard key={index} product={product} cartItem={item} />
                );
              })}
            </div>

            <div className="lg:w-1/3">
              <CartSummary subTotal={getSubtotal()} />
            </div>
          </div>
        </div>
      ) : (
        <CheckoutViewSkeleton />
      )}

      {modalAddress && (
        <ModalAddress
          modalAddress={modalAddress}
          onClose={() => setModalAddress(false)}
          addressList={profile.address || []}
          selectedAddress={address}
          setSelectedAddress={setAddress}
          onAddAddress={onAddAddress}
          setProfile={setProfile}
        />
      )}
    </>
  );
};

export default CheckoutView;

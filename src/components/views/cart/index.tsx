import Button from "@/components/ui/Button";
// import Title from "@/components/ui/Text/Title";
import { Cart } from "@/types/cart.type";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";

type Proptypes = {
  cart: Cart[];
  products: Product[];
};
const CartView = (props: Proptypes) => {
  const { cart, products } = props;

  const getSubtotal = () => {
    const subtotal = cart.reduce((acc, item) => {
      const product = products.find(({ id }) => id === item.productId);
      return acc + (product?.price ?? 0) * item.qty;
    }, 0);
    return subtotal;
  };

  return (
    <div className="p-5 md:px-20 lg:px-48 lg:pt-5 lg:pb-10">
      <h1 className="font-bold text-3xl">Cart</h1>
      {cart.length > 0 ? (
        <div className="flex lg:flex-row flex-col-reverse lg:gap-5 mt-3 lg:mt-5">
          <div className="w-full lg:w-2/3">
            {cart.map((item, index) => {
              const product = products.find(({ id }) => id === item.productId);
              return (
                <div
                  key={index}
                  className="flex gap-2 mb-2 w-full h-28 lg:h-36"
                >
                  <div className="w-28 lg:w-36 h-28 lg:h-36 overflow-hidden">
                    {product?.mainImage && (
                      <Image
                        src={product.mainImage}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                        priority
                      />
                    )}
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between w-full">
                      <p className="font-semibold md:text-md text-sm lg:text-lg">
                        {product?.name}
                      </p>
                      <p className="font-semibold md:text-md text-sm lg:text-lg">
                        {convertIDR(product?.price ?? 0)}
                      </p>
                    </div>
                    <p className="mt-1 font-medium text-neutral-600 lg:text-md text-xs">
                      {product?.category}
                    </p>
                    <p className="mt-1 font-medium text-neutral-600 lg:text-md text-xs">
                      {product?.colourShown}
                    </p>
                    <div className="flex gap-2 mt-1">
                      <p className="font-medium text-neutral-600 text-xs md:text-xs">
                        Size {item.size}
                      </p>
                      <p className="font-medium text-neutral-600 text-xs md:text-xs">
                        Quantity {item.qty}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-1">
                      <button className="p-1 cursor-pointer">
                        <i className="bx bx-heart" />
                      </button>
                      <button className="p- cursor-pointer">
                        <i className="bx bx-trash" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mb-5 lg:w-1/3">
            <table className="table w-full table-auto">
              <thead>
                <tr>
                  <th colSpan={2}>
                    <h1 className="font-semibold text-lg md:text-xl text-left">
                      Summary
                    </h1>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1">
                    <p className="mt-1 font-medium md:text-md text-sm">
                      Subtotal
                    </p>
                  </td>
                  <td className="py-1">
                    <p className="mt-1 font-medium md:text-md text-sm">
                      {convertIDR(getSubtotal())}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="py-1">
                    <p className="mt-1 font-medium md:text-md text-sm">
                      Estimated Delivery & Handling
                    </p>
                  </td>
                  <td className="py-1"> -</td>
                </tr>
                <tr>
                  <td className="py-1">
                    <p className="mt-1 font-medium md:text-md text-sm">
                      Estimated Duties & Taxes
                    </p>
                  </td>
                  <td className="py-1"> -</td>
                </tr>
                <tr>
                  <td className="py-1 border-neutral-200 border-t border-b">
                    <p className="mt-1 font-medium md:text-md text-sm">Total</p>
                  </td>
                  <td className="py-1 border-neutral-200 border-t border-b">
                    <p className="mt-1 font-medium md:text-md text-sm">
                      {convertIDR(getSubtotal())}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <Button
              type="button"
              variant="primary"
              classname="w-full rounded-l-full rounded-r-full md:py-4 mt-3 md:mt-5"
            >
              Member Checkout
            </Button>
          </div>
        </div>
      ) : (
        <div>No data</div>
      )}
    </div>
  );
};

export default CartView;

import Button from "@/components/ui/Button";
import { ToasterContext } from "@/contexts/ToasterContext";
import orderServices from "@/services/orders";
import { Order } from "@/types/orders.type";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import { ConvertDateToString } from "@/utils/date";
import Image from "next/image";
import { Dispatch, SetStateAction, useContext } from "react";
type Proptypes = {
  order: Order;
  product: Product;
  setOrderDetails: Dispatch<SetStateAction<Order | null>>;
  setPaymentDetails: Dispatch<SetStateAction<Order | null>>;
};

const OrderCard = (props: Proptypes) => {
  const { order, product, setOrderDetails, setPaymentDetails } = props;
  const { setToaster } = useContext(ToasterContext);

  const handleFinishOrder = async () => {
    const result = await orderServices.updateOrder(order.id, {
      status: "done",
    });
    if (result.status === 200) {
      order.status = "done";
      setToaster({
        type: "success",
        message: "Order finished successfully",
      });
    } else {
      setToaster({
        type: "error",
        message: "Failed to finish order",
      });
    }
  };
  return (
    <div
      key={order.id}
      className="shadow-xs mb-3 p-2 border border-neutral-200 rounded-lg w-full"
    >
      <div className="flex md:flex-row flex-col-reverse md:items-center gap-2 md:gap-5 mb-3">
        <div className="flex items-center gap-2 md:gap-5 mb-1">
          <div className="flex items-center gap-1 px-2 py-1">
            <i className="text-xl bx bx-shopping-bag" />
            <p className="font-semibold text-neutral-600 text-xs">Shopping</p>
          </div>

          <p className="font-semibold text-neutral-700 text-xs md:text-sm">
            {ConvertDateToString(order.created_at)}
          </p>
          <div
            className={`${
              order.status === "pending"
                ? "bg-yellow-200 text-yellow-800"
                : order.status === "paid"
                ? "bg-blue-200 text-blue-800"
                : order.status === "shipped"
                ? "bg-purple-200 text-purple-800"
                : "bg-green-200 text-green-800"
            } px-2 py-1 rounded`}
          >
            <p className="font-semibold text-xs md:text-sm">
              {order.status && order.status.toUpperCase()}
            </p>
          </div>
        </div>
        <p className="font-bold text-neutral-700 text-sm">
          #{order.id.toUpperCase()}
        </p>
      </div>

      <div className="pr-[5%] w-full">
        <div className="flex gap-3">
          {product && product.mainImage && (
            <div className="w-28 h-28">
              <Image
                src={product?.mainImage}
                alt={product?.name}
                width={100}
                height={100}
                priority
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {product && (
            <div className="flex justify-between gap-2 w-full">
              <div>
                <p className="font-semibold text-md md:text-lg">
                  {product?.name}
                </p>
                <p className="text-neutral-500 text-xs md:text-sm">
                  {order.items[0].qty} x {convertIDR(product!.price)}
                </p>
                <p className="text-neutral-500 text-xs md:text-sm">
                  Size : {order.items[0].size}
                </p>
                {order.items.length > 1 && (
                  <button
                    className="mt-2 cursor-pointer"
                    onClick={() => setOrderDetails(order)}
                  >
                    <p className="font-medium text-neutral-600 text-xs md:text-sm">
                      +{order.items.length - 1} more product
                    </p>
                  </button>
                )}
              </div>

              <div>
                <p className="text-neutral-700 text-xs md:text-sm">
                  Order Total
                </p>
                <p className="font-semibold text-md md:text-lg">
                  {convertIDR(order.subtotal + order.taxes)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            classname="bg-white"
            onClick={() => setOrderDetails(order)}
          >
            <p className="md:text-md text-sm">View Details</p>
          </Button>
          <Button onClick={() => setPaymentDetails(order)}>
            <p className="md:text-md text-sm">
              {order.status === "pending"
                ? "Proceed to Payment"
                : "Payment Receipt"}
            </p>
          </Button>
          {order.status === "shipped" && (
            <Button onClick={handleFinishOrder}>
              <p className="md:text-md text-sm">Finish Order</p>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

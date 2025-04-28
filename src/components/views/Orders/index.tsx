import Button from "@/components/ui/Button";
import Title from "@/components/ui/Text/Title";
import { Order } from "@/types/orders.type";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import { ConvertDateToString } from "@/utils/date";
import Image from "next/image";
import { useState } from "react";
import OrderDetails from "./OrderDetails";

type Proptypes = {
  orders: Order[];
  products: Product[];
  isLoading: boolean;
};
const OrdersView = (props: Proptypes) => {
  const { orders, products, isLoading } = props;
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  return (
    <div className="p-5 md:px-20 lg:px-48 lg:pt-12 lg:pb-10">
      <Title>Orders</Title>
      {isLoading ? (
        <div className="mt-5">
          {Array.from({ length: 4 }, (_, index) => {
            return (
              <div
                key={index}
                className="bg-neutral-200 mb-3 rounded w-full h-52 animate-pulse"
              ></div>
            );
          })}
        </div>
      ) : !isLoading && orders.length === 0 ? (
        <div className="bg-neutral-200 mt-3 p-3 w-full">
          <p>
            Your orders are empty. Start adding your favorite products to your
            cart and make an order! 😊🛒
          </p>
        </div>
      ) : (
        <div className="mt-5">
          {orders.map((order) => {
            const product = products.find(
              (product) => product.id === order.items[0].productId
            );
            return (
              <div
                key={order.id}
                className="shadow-xs mb-3 p-2 border border-neutral-200 rounded-lg w-full"
              >
                <div className="flex md:flex-row flex-col-reverse md:items-center gap-2 mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-1 px-2 py-1">
                      <i className="text-xl bx bx-shopping-bag" />
                      <p className="font-semibold text-neutral-600 text-xs">
                        Shopping
                      </p>
                    </div>

                    <p className="font-semibold text-neutral-700 text-xs md:text-sm">
                      {ConvertDateToString(order.created_at)}
                    </p>
                    <div className="bg-primary px-2 py-1 rounded">
                      <p className="font-semibold text-white text-xs md:text-sm">
                        {order.status.toUpperCase()}
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

                  <div className="flex justify-end gap-5">
                    <Button
                      variant="secondary"
                      classname="bg-white"
                      onClick={() => setOrderDetails(order)}
                    >
                      <p className="md:text-md text-sm">See Details</p>
                    </Button>
                    <Button>
                      <p className="md:text-md text-sm">Proceed to Payment</p>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {Object.keys(orderDetails || {}).length > 0 && orderDetails && (
        <OrderDetails
          onClose={() => setOrderDetails(null)}
          order={orderDetails}
          products={products}
        />
      )}
    </div>
  );
};

export default OrdersView;

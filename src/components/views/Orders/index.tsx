import Title from "@/components/ui/Text/Title";
import { Order } from "@/types/orders.type";
import { Product } from "@/types/product.type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import OrderDetails from "./OrderDetails";
import OrderCard from "./Card";
import PaymentDetails from "./PaymentDetails";
import Button from "@/components/ui/Button";

type Proptypes = {
  orders: Order[];
  setOrders: Dispatch<SetStateAction<Order[]>>;
  products: Product[];
  isLoading: boolean;
};

const orderStatus = [
  { id: 0, name: "All Orders" },
  { id: 1, name: "Pending" },
  { id: 2, name: "Paid" },
];

const OrdersView = (props: Proptypes) => {
  const { orders, products, isLoading, setOrders } = props;
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<Order | null>(null);
  const [orderState, setOrderState] = useState<number>(0);
  const [showedOrders, setShowedOrders] = useState<Order[]>(orders);

  useEffect(() => {
    const filteredOrders = orders.filter(
      (order) =>
        order.status.toLowerCase() ===
        orderStatus[orderState].name.toLowerCase()
    );
    setShowedOrders(orderState === 0 ? orders : filteredOrders);
  }, [orderState, orders]);

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
              />
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
        orders && (
          <div className="mt-5">
            <div className="flex items-center gap-3 mb-5">
              <p className="font-semibold text-md">Status</p>
              {orderStatus.map((status) => {
                return (
                  <Button
                    key={status.id}
                    variant={`${
                      orderState === status.id ? "primary" : "secondary"
                    }`}
                    onClick={() => setOrderState(status.id)}
                  >
                    <p className="">{status.name}</p>
                  </Button>
                );
              })}
            </div>
            {showedOrders.map((order) => {
              const product = products.find(
                (product) => product.id === order.items[0].productId
              );
              return (
                <OrderCard
                  key={order.id}
                  order={order}
                  product={product!}
                  setOrderDetails={setOrderDetails}
                  setPaymentDetails={setPaymentDetails}
                />
              );
            })}
          </div>
        )
      )}

      {Object.keys(orderDetails || {}).length > 0 && orderDetails && (
        <OrderDetails
          onClose={() => setOrderDetails(null)}
          order={orderDetails}
          products={products}
        />
      )}

      {Object.keys(paymentDetails || {}).length > 0 && paymentDetails && (
        <PaymentDetails
          order={paymentDetails}
          products={products}
          setOrders={setOrders}
          onClose={() => setPaymentDetails(null)}
        />
      )}
    </div>
  );
};

export default OrdersView;

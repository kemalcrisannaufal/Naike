import { orderStatus } from "@/common/constant/orderStatus";
import Button from "../../Button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Order } from "@/types/orders.type";

type Proptypes = {
  orders: Order[];
  setFilteredOrders: Dispatch<SetStateAction<Order[]>>;
};

const OrderStatusFilter = (props: Proptypes) => {
  const { orders, setFilteredOrders } = props;
  const [orderState, setOrderState] = useState<number>(0);

  useEffect(() => {
    const filteredOrders = orders.filter(
      (order) =>
        order.status.toLowerCase() ===
        orderStatus[orderState].name.toLowerCase()
    );
    setFilteredOrders(orderState === 0 ? orders : filteredOrders);
  }, [orderState, orders, setFilteredOrders]);

  return (
    <div className="flex flex-wrap items-center gap-3 mb-5">
      <p className="font-semibold text-md">Status</p>
      {orderStatus.map((status) => {
        return (
          <Button
            key={status.id}
            variant={`${orderState === status.id ? "primary" : "secondary"}`}
            onClick={() => setOrderState(status.id)}
          >
            <p className="">{status.name}</p>
          </Button>
        );
      })}
    </div>
  );
};

export default OrderStatusFilter;

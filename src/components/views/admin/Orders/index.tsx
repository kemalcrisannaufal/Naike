import AdminLayout from "@/components/layouts/Admin";
import Title from "@/components/ui/Text/Title";
import { Order } from "@/types/orders.type";
import { useState } from "react";
import OrderDetails from "../../Orders/OrderDetails";
import { Product } from "@/types/product.type";
import ProcessOrder from "./ProcessOrder";
import OrderStatusFilter from "@/components/ui/Filter/OrderStatusFilter";
import OrdersTable from "./OrdersTable";

type Proptypes = {
  orders: Order[];
  productOrders: Product[];
};

const AdminOrdersView = (props: Proptypes) => {
  const { orders, productOrders } = props;
  const [showDetail, setShowDetail] = useState<Order>({} as Order);
  const [processOrder, setProcessOrder] = useState<Order>({} as Order);
  const [orderState, setOrderState] = useState<number>(0);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);

  return (
    <>
      <AdminLayout>
        <Title>Orders</Title>
        <div className="my-5">
          <OrderStatusFilter
            orders={orders}
            setFilteredOrders={setFilteredOrders}
            setOrderState={setOrderState}
            orderState={orderState}
          />
          <div>
            <OrdersTable
              orders={filteredOrders}
              setShowDetail={setShowDetail}
              setProcessOrder={setProcessOrder}
            />
            {filteredOrders.length === 0 && (
              <div className="flex justify-center items-center w-full h-20">
                <p className="font-semibold text-neutral-600">
                  No orders found
                </p>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>

      {showDetail && Object.keys(showDetail).length > 0 && (
        <OrderDetails
          order={showDetail}
          products={productOrders}
          onClose={() => setShowDetail({} as Order)}
        />
      )}
      {processOrder && Object.keys(processOrder).length > 0 && (
        <ProcessOrder
          onClose={() => setProcessOrder({} as Order)}
          order={processOrder}
          products={productOrders}
        />
      )}
    </>
  );
};

export default AdminOrdersView;

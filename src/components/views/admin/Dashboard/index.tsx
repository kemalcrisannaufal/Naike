import AdminLayout from "@/components/layouts/Admin";
import Title from "@/components/ui/Text/Title";
import StatsCard from "./StatsCard";
import { convertIDR } from "@/utils/currency";
import { usePayment } from "@/components/hooks/usePayment";
import { totalRevenue } from "@/utils/total";
import { useUser } from "@/components/hooks/useUser";
import { useOrder } from "@/components/hooks/useOrder";
import OrdersTable from "../Orders/OrdersTable";
import { Order } from "@/types/orders.type";
import { useEffect, useState } from "react";
import OrderDetails from "../../Orders/OrderDetails";
import ProcessOrder from "../Orders/ProcessOrder";
import { orderStatus } from "@/common/constant/orderStatus";

const DashboardAdminView = () => {
  const { payments, isLoading: paymentLoading } = usePayment();
  const { users, isLoading: userLoading } = useUser();
  const { orders, productOrders, isLoading: orderLoading } = useOrder();
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  const [showDetail, setShowDetail] = useState<Order>({} as Order);
  const [processOrder, setProcessOrder] = useState<Order>({} as Order);

  useEffect(() => {
    const filteredOrders = orders.filter((order) => {
      return order.status === "paid";
    });
    setFilteredOrders(filteredOrders);
  }, [orders]);

  return (
    <>
      <AdminLayout>
        <Title>Dashboard</Title>
        <div className="flex gap-5 mt-5 overflow-x-auto">
          <StatsCard
            icon="bx-dollar"
            title="Total Revenue"
            description="Revenue from completed payments"
            loading={paymentLoading}
            value={
              payments
                ? convertIDR(
                    Array.isArray(payments) ? totalRevenue(payments) : 0
                  )
                : 0
            }
          />
          <StatsCard
            icon="bx-shopping-bag"
            title="Total Order"
            description="Number of completed orders"
            loading={orderLoading}
            value={orders.length}
          />
          <StatsCard
            icon="bx-user"
            description="Total registered users"
            title="Total Customer"
            loading={userLoading}
            value={users.length}
          />
        </div>
        <div className="flex gap-2 mt-5 overflow-x-auto">
          {orderStatus
            .filter((status) => status.id !== 0)
            .map((status) => {
              return (
                <div
                  key={status.id}
                  className={`flex flex-col items-center p-3  rounded w-full min-w-[150px] ${
                    status.name.toLocaleLowerCase() === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : status.name.toLocaleLowerCase() === "paid"
                      ? "bg-blue-200 text-blue-800"
                      : status.name.toLocaleLowerCase() === "shipped"
                      ? "bg-purple-200 text-purple-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  <p className="font-semibold">{status.name}</p>
                  <p>
                    {
                      orders.filter(
                        (order) => order.status === status.name.toLowerCase()
                      ).length
                    }{" "}
                    Orders
                  </p>
                </div>
              );
            })}
        </div>
        <div className="mt-5">
          <Title variant="small">Orders to Ship</Title>
          <div className="my-5">
            <OrdersTable
              orders={filteredOrders.slice(0, 5)}
              setProcessOrder={setProcessOrder}
              setShowDetail={setShowDetail}
            />

            {filteredOrders.length === 0 && (
              <div className="flex justify-center items-center w-full h-20">
                <p className="font-semibold text-neutral-600">
                  No orders to ship
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

export default DashboardAdminView;

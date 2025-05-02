import AdminLayout from "@/components/layouts/Admin";
import Button from "@/components/ui/Button";
import Title from "@/components/ui/Text/Title";
import { Order } from "@/types/orders.type";
import { convertIDR } from "@/utils/currency";
import { getDate, getTime } from "@/utils/date";
import { useState } from "react";
import OrderDetails from "../../Orders/OrderDetails";
import { Product } from "@/types/product.type";
import ProcessOrder from "./ProcessOrder";
import OrderStatusFilter from "@/components/ui/Filter/OrderStatusFilter";

const tableHeaderClass =
  "bg-neutral-100 px-4 py-4 border-neutral-300 border-b text-neutral-700 ";
const tableCellClass = "px-4 py-2";

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
          <div className="bg-white w-full overflow-x-auto">
            <table className="w-full min-w-max table-auto">
              <thead>
                <tr>
                  <th className={tableHeaderClass}>No</th>
                  <th className={tableHeaderClass}>Order Id</th>
                  <th className={tableHeaderClass}>Order Date</th>
                  <th className={tableHeaderClass}>Total Items</th>
                  <th className={tableHeaderClass}>Total</th>
                  <th className={tableHeaderClass}>Status</th>
                  <th className={`${tableHeaderClass} text-center`}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order: Order, index: number) => {
                  return (
                    <tr key={order.id}>
                      <td className={tableCellClass}>{index + 1}</td>
                      <td className={tableCellClass}>
                        <p className="bg-green-200 p-2 border rounded-full w-max font-semibold text-green-800 text-xs">
                          #{order.id.toUpperCase()}
                        </p>
                      </td>
                      <td className={tableCellClass}>
                        <p className="mb-1 text-neutral-600 text-sm">
                          Date : {getDate(order.created_at)}
                        </p>
                        <p className="mb-1 text-neutral-600 text-sm">
                          Time : {getTime(order.created_at)}
                        </p>
                      </td>
                      <td className={`${tableCellClass}`}>
                        <p className="font-semibold text-neutral-500 text-sm underline">
                          {order.items.length}{" "}
                          {order.items.length > 1 ? "items" : "item"}
                        </p>
                      </td>
                      <td className={tableCellClass}>
                        <p className="font-semibold">
                          {convertIDR(order.subtotal + order.taxes)}
                        </p>
                      </td>
                      <td className={tableCellClass}>
                        <p
                          className={`w-max px-2 py-1 rounded ${
                            order.status === "pending"
                              ? "bg-yellow-200 text-yellow-800"
                              : order.status === "paid"
                              ? "bg-blue-200 text-blue-800"
                              : order.status === "shipped"
                              ? "bg-purple-200 text-purple-800"
                              : "bg-green-200 text-green-800"
                          }`}
                        >
                          <p className="font-semibold text-xs">
                            {order.status.toUpperCase()}
                          </p>
                        </p>
                      </td>
                      <td
                        className={`${tableCellClass} flex gap-2 justify-center`}
                      >
                        <Button
                          type="button"
                          onClick={() => setShowDetail(order)}
                          classname="bg-yellow-500 hover:bg-yellow-700"
                        >
                          <i className="text-lg bx bx-receipt" />
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          disabled={order.status !== "paid"}
                          onClick={() => setProcessOrder(order)}
                          classname="bg-sky-500 hover:bg-blue-700"
                        >
                          <i className="text-white text-lg bx bx-package" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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

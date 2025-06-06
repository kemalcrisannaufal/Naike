import AdminLayout from "@/components/layouts/Admin";
import Title from "@/components/ui/Text/Title";
import { Order } from "@/types/orders.type";
import { useEffect, useState } from "react";
import OrderDetails from "../../Orders/OrderDetails";
import { Product } from "@/types/product.type";
import ProcessOrder from "./ProcessOrder";
import OrderStatusFilter from "@/components/ui/Filter/OrderStatusFilter";
import OrdersTable from "./OrdersTable";
import Pagination from "@/components/ui/Pagination";
import DateFilter from "@/components/ui/Filter/DateFilter";

type Proptypes = {
  orders: Order[];
  productOrders: Product[];
};

const AdminOrdersView = (props: Proptypes) => {
  const { orders, productOrders } = props;
  const [showDetail, setShowDetail] = useState<Order>({} as Order);
  const [processOrder, setProcessOrder] = useState<Order>({} as Order);

  const dataPerPage = 10;
  const [idxPage, setIdxPage] = useState<number>(0);
  const [showedOrders, setShowedOrders] = useState<Order[]>(
    orders.slice(0, dataPerPage)
  );
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(
    orders.slice(0, dataPerPage)
  );
  const [searchDate, setSearchDate] = useState<string>("");

  useEffect(() => {
    if (filteredOrders.length <= dataPerPage) {
      setShowedOrders(filteredOrders);
      setIdxPage(0);
    } else {
      setShowedOrders(
        filteredOrders.slice(
          idxPage * dataPerPage,
          idxPage * dataPerPage + dataPerPage
        )
      );
    }
  }, [idxPage, filteredOrders]);

  useEffect(() => {
    const filteredOrders = searchDate
      ? orders.filter((order) =>
          new Date(order.created_at).toISOString().startsWith(searchDate)
        )
      : orders;
    setFilteredOrders(filteredOrders);
  }, [orders, searchDate]);

  return (
    <>
      <AdminLayout>
        <Title>Orders</Title>
        <div className="my-5">
          <div>
            <div className="lg:flex justify-between">
              <OrderStatusFilter
                orders={orders}
                setFilteredOrders={setFilteredOrders}
              />
              <DateFilter
                searchDate={searchDate}
                setSearchDate={setSearchDate}
              />
            </div>

            <OrdersTable
              orders={showedOrders}
              setShowDetail={setShowDetail}
              setProcessOrder={setProcessOrder}
              dataPerPage={dataPerPage}
              idxPage={idxPage}
            />
            {showedOrders.length === 0 && (
              <div className="flex justify-center items-center w-full h-20">
                <p className="font-semibold text-neutral-600">
                  No orders found
                </p>
              </div>
            )}
          </div>
        </div>
        <Pagination
          dataPerPage={dataPerPage}
          dataLength={orders.length}
          setIdxPage={setIdxPage}
          idxPage={idxPage}
        />
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

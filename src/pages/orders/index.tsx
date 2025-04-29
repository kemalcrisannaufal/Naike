import { useOrder } from "@/components/hooks/useOrder";
import OrdersView from "@/components/views/Orders";
import Head from "next/head";
const OrdersPage = () => {
  const { orders, setOrders, productOrders, isLoading } = useOrder();

  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <OrdersView
        orders={orders}
        setOrders={setOrders}
        products={productOrders}
        isLoading={isLoading}
      />
    </>
  );
};

export default OrdersPage;

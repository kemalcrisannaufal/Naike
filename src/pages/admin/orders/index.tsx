import { useOrder } from "@/components/hooks/useOrder";
import AdminOrdersView from "@/components/views/admin/Orders";
import Head from "next/head";

const AdminOrdersPage = () => {
  const { orders, productOrders } = useOrder();
  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <AdminOrdersView orders={orders} productOrders={productOrders} />
    </>
  );
};
export default AdminOrdersPage;

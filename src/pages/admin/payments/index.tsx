import { useOrder } from "@/components/hooks/useOrder";
import { usePayment } from "@/components/hooks/usePayment";
import AdminPaymentsView from "@/components/views/admin/Payments";
import Head from "next/head";

const AdminPaymentsPage = () => {
  const { payments } = usePayment();
  const { orders, productOrders } = useOrder();
  return (
    <>
      <Head>
        <title>Payments</title>
      </Head>
      <AdminPaymentsView
        payments={payments ?? []}
        orders={orders}
        productOrders={productOrders}
      />
    </>
  );
};
export default AdminPaymentsPage;

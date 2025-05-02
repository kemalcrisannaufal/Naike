import AdminLayout from "@/components/layouts/Admin";
import Title from "@/components/ui/Text/Title";
import { Payment } from "@/types/payment.type";
import PaymentsTable from "./PaymentTable";
import { useState } from "react";
import OrderDetails from "../../Orders/OrderDetails";
import { Order } from "@/types/orders.type";
import { Product } from "@/types/product.type";

type Proptypes = {
  payments: Payment[];
  orders: Order[];
  productOrders: Product[];
};

const AdminPaymentsView = (props: Proptypes) => {
  const { payments, orders, productOrders } = props;
  const [showDetail, setShowDetail] = useState<Payment | null>(null);

  return (
    <>
      <AdminLayout>
        <Title>Payments</Title>
        <div className="mt-5">
          <PaymentsTable payments={payments} setShowDetail={setShowDetail} />
          {payments.length === 0 && (
            <div className="flex justify-center items-center w-full h-20">
              <p className="font-semibold text-neutral-600">
                No payments found
              </p>
            </div>
          )}
        </div>
      </AdminLayout>

      {showDetail && (
        <OrderDetails
          products={productOrders}
          order={
            orders.find((order) => order.id === showDetail.orderId) as Order
          }
          onClose={() => setShowDetail(null)}
        />
      )}
    </>
  );
};

export default AdminPaymentsView;

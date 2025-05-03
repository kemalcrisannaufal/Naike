import AdminLayout from "@/components/layouts/Admin";
import Title from "@/components/ui/Text/Title";
import { Payment } from "@/types/payment.type";
import PaymentsTable from "./PaymentTable";
import { useEffect, useState } from "react";
import OrderDetails from "../../Orders/OrderDetails";
import { Order } from "@/types/orders.type";
import { Product } from "@/types/product.type";
import Pagination from "@/components/ui/Pagination";
import DateFilter from "@/components/ui/Filter/DateFilter";

type Proptypes = {
  payments: Payment[];
  orders: Order[];
  productOrders: Product[];
};

const AdminPaymentsView = (props: Proptypes) => {
  const { payments, orders, productOrders } = props;
  const [showDetail, setShowDetail] = useState<Payment | null>(null);

  const dataPerPage = 10;
  const [showedPayments, setShowedPayments] = useState<Payment[]>(
    payments.slice(0, dataPerPage)
  );
  const [idxPage, setIdxPage] = useState<number>(0);
  const [searchDate, setSearchDate] = useState<string>("");

  useEffect(() => {
    const filteredPayments = searchDate
      ? payments.filter((payment) =>
          new Date(payment.created_at).toISOString().startsWith(searchDate)
        )
      : payments;

    setShowedPayments(
      filteredPayments.slice(
        idxPage * dataPerPage,
        idxPage * dataPerPage + dataPerPage
      )
    );
  }, [idxPage, payments, searchDate]);

  return (
    <>
      <AdminLayout>
        <Title>Payments</Title>
        <div className="mt-5">
          <div className="flex md:justify-end">
            <DateFilter searchDate={searchDate} setSearchDate={setSearchDate} />
          </div>
          <div>
            <PaymentsTable
              payments={showedPayments}
              setShowDetail={setShowDetail}
              dataPerPage={dataPerPage}
              idxPage={idxPage}
            />
            {showedPayments.length === 0 && (
              <div className="flex justify-center items-center w-full h-20">
                <p className="font-semibold text-neutral-600">
                  No payments found
                </p>
              </div>
            )}
          </div>
        </div>

        <Pagination
          dataLength={
            searchDate
              ? payments.filter((payment) =>
                  new Date(payment.created_at)
                    .toISOString()
                    .startsWith(searchDate)
                ).length
              : payments.length
          }
          dataPerPage={10}
          setIdxPage={setIdxPage}
          idxPage={idxPage}
        />
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

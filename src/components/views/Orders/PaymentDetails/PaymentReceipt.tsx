import Modal from "@/components/ui/Modal";
import Title from "@/components/ui/Text/Title";
import { Order } from "@/types/orders.type";
import { Payment } from "@/types/payment.type";
import TransactionInformation from "./TransactionInformation";
import { Product } from "@/types/product.type";
import { useEffect, useState } from "react";
import paymentServices from "@/services/payment";
import { ConvertDateToString } from "@/utils/date";
import Button from "@/components/ui/Button";

type Proptypes = {
  onClose: () => void;
  order: Order;
  products: Product[];
};
const PaymentReceipt = (props: Proptypes) => {
  const { onClose, order, products } = props;
  const [paymentInfo, setPaymentInfo] = useState<Payment | null>(null);

  useEffect(() => {
    const getPaymentInfo = async () => {
      const { data } = await paymentServices.getPaymentInfo(order.id);
      setPaymentInfo(data.data[0]);
    };
    getPaymentInfo();
  }, [order]);
  return (
    <Modal onClose={onClose}>
      <Title>Payment Receipt</Title>
      <div className="flex flex-col items-center my-5 w-full">
        <i className="text-green-600 text-7xl bx bxs-badge-check" />
        <p className="font-medium text-green-600 text-xl">Payment Successful</p>
      </div>

      <div className="lg:px-20 w-full">
        <TransactionInformation order={order} products={products}>
          {paymentInfo && (
            <div>
              <div className="my-2 border-neutral-500 border-t w-full" />
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs md:text-base">Payment Number</p>
                <p className="font-semibold text-xs md:text-base">
                  #{paymentInfo.id?.toUpperCase()}
                </p>
              </div>
              <div className="my-2 border-neutral-500 border-t w-full" />
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs md:text-base">Payment Date</p>
                <p className="font-semibold text-xs md:text-base">
                  {ConvertDateToString(paymentInfo.created_at)}
                </p>
              </div>
              <div className="my-2 border-neutral-500 border-t w-full" />
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs md:text-base">Payment Method</p>
                <p className="font-semibold text-xs md:text-base">
                  {paymentInfo.method}
                </p>
              </div>
            </div>
          )}
        </TransactionInformation>
        <div className="flex justify-center mt-10 w-full">
          <Button onClick={onClose}>Back to Orders</Button>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentReceipt;

import paymentServices from "@/services/payment";
import { Order } from "@/types/orders.type";
import { Payment } from "@/types/payment.type";

import { convertIDR } from "@/utils/currency";
import { ConvertDateToString } from "@/utils/date";
import { useEffect, useState } from "react";

type Proptypes = {
  order: Order;
};

const PaymentDetail = (props: Proptypes) => {
  const { order } = props;
  const [paymentInfo, setPaymentInfo] = useState<Payment | null>(null);

  useEffect(() => {
    const getPaymentInfo = async () => {
      const { data } = await paymentServices.getPaymentInfo(order.id);
      setPaymentInfo(data.data[0]);
    };
    getPaymentInfo();
  }, [order]);

  return (
    <div className="mt-5 px-5 py-2 border border-neutral-200 w-full">
      <p className="mb-3 font-semibold text-md">Payment Detail</p>
      {paymentInfo && (
        <div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-neutral-600 text-xs md:text-sm">Payment Date</p>
            <p className="text-xs md:text-sm">
              {ConvertDateToString(paymentInfo.created_at)}
            </p>
          </div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-neutral-600 text-xs md:text-sm">
              Payment Method
            </p>
            <p className="text-xs md:text-sm">{paymentInfo.method}</p>
          </div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-neutral-600 text-xs md:text-sm">
              Payment Status
            </p>
            <p className="text-xs md:text-sm">{paymentInfo.status}</p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-1">
        <p className="text-neutral-600 text-xs md:text-sm">Subtotal Product</p>
        <p className="text-xs md:text-sm">{convertIDR(order.subtotal)}</p>
      </div>
      <div className="flex justify-between items-center mb-1">
        <p className="text-neutral-600 text-xs md:text-sm">Duties & Taxes</p>
        <p className="text-xs md:text-sm">{convertIDR(order.taxes)}</p>
      </div>
      <div className="flex justify-between items-center mb-1">
        <p className="text-neutral-600 text-xs md:text-sm">Total</p>
        <p className="font-semibold text-xs md:text-sm">
          {convertIDR(order.subtotal + order.taxes)}
        </p>
      </div>
    </div>
  );
};

export default PaymentDetail;

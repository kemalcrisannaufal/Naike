import { Order } from "@/types/orders.type";
import { convertIDR } from "@/utils/currency";

type Proptypes = {
  order: Order;
};

const PaymentDetail = (props: Proptypes) => {
  const { order } = props;
  return (
    <div className="mt-5 px-5 py-2 border border-neutral-200 w-full">
      <p className="mb-3 font-semibold text-md">Payment Detail</p>
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

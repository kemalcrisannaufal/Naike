import { Order } from "@/types/orders.type";
import { ConvertDateToString } from "@/utils/date";

type Proptypes = {
  order: Order;
};

const TransactionDetail = (props: Proptypes) => {
  const { order } = props;
  return (
    <div className="mt-5 px-5 py-2 border border-neutral-200 w-full">
      <p className="mb-3 font-semibold text-md">Transaction Detail</p>
      <div className="flex justify-between items-center mb-1">
        <p className="text-neutral-600 text-xs md:text-sm">Order Number</p>
        <p className="font-semibold text-xs md:text-sm">
          #{order.id.toUpperCase()}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-neutral-600 text-xs md:text-sm">Order Date</p>
        <p className="text-xs md:text-sm">
          {ConvertDateToString(order.created_at)}
        </p>
      </div>
    </div>
  );
};

export default TransactionDetail;

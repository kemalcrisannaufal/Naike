import { Order } from "@/types/orders.type";

type Proptypes = {
  order: Order;
};

const ShippingDetail = (props: Proptypes) => {
  const { order } = props;
  return (
    <div className="mt-5 px-5 py-2 border border-neutral-200 w-full">
      <p className="mb-3 font-semibold text-md">Shipping Information</p>
      <table className="table w-full table-auto">
        <tbody>
          <tr>
            <td className="w-1/4">
              <p className="text-neutral-600 text-xs md:text-sm">
                Delivery Service
              </p>
            </td>
            <td>
              <p className="font-semibold text-xs md:text-sm">Standard</p>
            </td>
          </tr>
          <tr>
            <td className="w-1/4">
              <p className="text-neutral-600 text-xs md:text-sm">
                Tracking Number
              </p>
            </td>
            <td>
              <p className="font-semibold text-xs md:text-sm">
                #{order.id.toUpperCase()}
              </p>
            </td>
          </tr>
          <tr>
            <td className="w-1/4">
              <p className="text-neutral-600 text-xs md:text-sm">Address</p>
            </td>
            <td>
              <p className="font-semibold text-xs md:text-sm">
                {order.address.recipient}
              </p>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <p className="text-xs md:text-sm">{order.address.phone}</p>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <p className="text-xs md:text-sm">{order.address.addressLine}</p>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <p className="text-xs md:text-sm">{order.address.note}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShippingDetail;

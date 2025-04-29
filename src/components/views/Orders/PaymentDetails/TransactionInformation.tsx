import { Order } from "@/types/orders.type";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";

type Proptypes = {
  order: Order;
  products: Product[];
  children?: React.ReactNode;
};
const TransactionInformation = (props: Proptypes) => {
  const { order, products, children } = props;
  return (
    <div>
      <div className="flex justify-between items-center mt-5">
        <p className="text-xs md:text-base">Order Number</p>
        <p className="font-semibold text-xs md:text-base">
          #{order.id.toUpperCase()}
        </p>
      </div>
      <div className="my-2 border-neutral-500 border-t w-full" />

      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs md:text-base">Items</p>
          <p className="font-semibold text-xs md:text-base">
            {order.items.length}
          </p>
        </div>

        {order.items.map((item, index) => {
          const product = products.find(
            (product) => product.id === item.productId
          );
          return (
            <div
              key={index}
              className="flex justify-between items-center gap-2 mb-1 pl-5"
            >
              <div className="flex items-center gap-2 w-4/5">
                <p>{product?.name}</p>
                <p>(size:{item.size})</p>
              </div>
              <p>x{item.qty}</p>
            </div>
          );
        })}
      </div>

      {children}
      <div className="my-2 border-neutral-500 border-t w-full" />

      <div className="flex justify-between items-center mb-1">
        <p className="text-xs md:text-base">Subtotal</p>
        <p className="font-semibold text-xs md:text-base">
          {convertIDR(order.subtotal)}
        </p>
      </div>
      <div className="flex justify-between items-center mb-1">
        <p className="text-xs md:text-base">Duties & Taxes</p>
        <p className="font-semibold text-xs md:text-base">
          {convertIDR(order.taxes)}
        </p>
      </div>

      <div className="my-2 border-neutral-500 border-t w-full" />

      <div className="flex justify-between items-center mb-1">
        <p className="text-xs md:text-base">Total</p>
        <p className="font-semibold text-xs md:text-base">
          {convertIDR(order.subtotal + order.taxes)}
        </p>
      </div>
    </div>
  );
};

export default TransactionInformation;

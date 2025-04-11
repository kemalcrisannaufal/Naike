import Button from "@/components/ui/Button";
import { convertIDR } from "@/utils/currency";

type Proptypes = {
  subTotal: number;
};

const CartSummary = (props: Proptypes) => {
  const { subTotal } = props;
  return (
    <div className="mb-5 lg:w-1/3">
      <table className="table w-full table-auto">
        <thead>
          <tr>
            <th colSpan={2}>
              <h1 className="font-semibold text-lg md:text-xl text-left">
                Summary
              </h1>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-1">
              <p className="mt-1 font-medium md:text-md text-sm">Subtotal</p>
            </td>
            <td className="py-1">
              <p className="mt-1 font-medium md:text-md text-sm">
                {convertIDR(subTotal)}
              </p>
            </td>
          </tr>
          <tr>
            <td className="py-1">
              <p className="mt-1 font-medium md:text-md text-sm">
                Estimated Delivery & Handling
              </p>
            </td>
            <td className="py-1"> -</td>
          </tr>
          <tr>
            <td className="py-1">
              <p className="mt-1 font-medium md:text-md text-sm">
                Estimated Duties & Taxes
              </p>
            </td>
            <td className="py-1"> -</td>
          </tr>
          <tr>
            <td className="py-1 border-neutral-200 border-t border-b">
              <p className="mt-1 font-medium md:text-md text-sm">Total</p>
            </td>
            <td className="py-1 border-neutral-200 border-t border-b">
              <p className="mt-1 font-medium md:text-md text-sm">
                {convertIDR(subTotal)}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <Button
        type="button"
        variant="primary"
        classname="w-full rounded-l-full rounded-r-full md:py-4 mt-3 md:mt-5"
      >
        Member Checkout
      </Button>
    </div>
  );
};

export default CartSummary;

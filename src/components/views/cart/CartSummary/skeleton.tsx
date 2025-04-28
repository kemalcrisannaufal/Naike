const CartSummarySkeleton = () => {
  return (
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
            <p className="bg-neutral-200 mb-2 w-32 h-4 font-semibold md:text-md text-sm lg:text-lg animate-pulse" />
          </td>
        </tr>
        <tr>
          <td className="py-1">
            <p className="mt-1 font-medium md:text-md text-sm">
              Estimated Delivery & Handling
            </p>
          </td>
          <td>
            <p className="bg-neutral-200 mb-2 w-32 h-4 font-semibold md:text-md text-sm lg:text-lg animate-pulse" />
          </td>
        </tr>
        <tr>
          <td className="py-1">
            <p className="mt-1 font-medium md:text-md text-sm">
              Estimated Duties & Taxes
            </p>
          </td>
          <td>
            <p className="bg-neutral-200 mb-2 w-32 h-4 font-semibold md:text-md text-sm lg:text-lg animate-pulse" />
          </td>
        </tr>
        <tr>
          <td className="py-1 border-neutral-200 border-t border-b">
            <p className="mt-1 font-medium md:text-md text-sm">Total</p>
          </td>
          <td className="py-1 border-neutral-200 border-t border-b">
            <p className="bg-neutral-200 mb-2 w-32 h-4 font-semibold md:text-md text-sm lg:text-lg animate-pulse" />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CartSummarySkeleton;

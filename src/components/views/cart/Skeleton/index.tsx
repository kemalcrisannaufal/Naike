const CartViewSkeleton = () => {
  return (
    <div className="p-5 md:px-20 lg:px-48 lg:pt-5 lg:pb-10">
      <h1 className="font-bold text-3xl">Cart</h1>
      <div className="flex lg:flex-row flex-col-reverse lg:gap-5 mt-3 lg:mt-5">
        <div className="w-full lg:w-2/3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex gap-2 mb-2 w-full h-28 lg:h-36">
              <div className="bg-neutral-200 w-28 lg:w-36 h-28 lg:h-36 animate-blink" />
              <div className="w-full">
                <div className="flex justify-between w-full">
                  <div className="bg-neutral-200 w-1/2 h-6 font-semibold md:text-md text-sm lg:text-lg animate-blink" />
                  <div className="bg-neutral-200 w-1/3 h-6 font-semibold md:text-md text-sm lg:text-lg animate-blink" />
                </div>
                <div className="bg-neutral-200 mb-2 w-1/2 h-6 font-semibold md:text-md text-sm lg:text-lg animate-blink" />
                <div className="bg-neutral-200 mb-2 w-1/2 h-6 font-semibold md:text-md text-sm lg:text-lg animate-blink" />
                <div className="flex gap-2 mt-1">
                  <div className="bg-neutral-200 mb-2 w-20 h-6 font-semibold md:text-md text-sm lg:text-lg animate-blink" />
                  <div className="bg-neutral-200 mb-2 w-20 h-6 font-semibold md:text-md text-sm lg:text-lg animate-blink" />
                </div>
                <div className="flex gap-2 mt-1">
                  <div className="bg-neutral-200 mb-2 w-6 h-6 font-semibold md:text-md text-sm lg:text-lg animate-blink" />
                  <div className="bg-neutral-200 mb-2 w-6 h-6 font-semibold md:text-md text-sm lg:text-lg animate-blink" />
                </div>
              </div>
            </div>
          ))}
        </div>
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
                  <p className="mt-1 font-medium md:text-md text-sm">
                    Subtotal
                  </p>
                </td>
                <td className="py-1">
                  <p className="bg-neutral-200 mb-2 w-32 h-6 font-semibold md:text-md text-sm lg:text-lg animate-blink" />
                </td>
              </tr>
              <tr>
                <td className="py-1">
                  <p className="mt-1 font-medium md:text-md text-sm">
                    Estimated Delivery & Handling
                  </p>
                </td>
                <td>
                  <p className="bg-neutral-200 mb-2 w-32 h-6 font-semibold md:text-md text-sm lg:text-lg animate-blink" />
                </td>
              </tr>
              <tr>
                <td className="py-1">
                  <p className="mt-1 font-medium md:text-md text-sm">
                    Estimated Duties & Taxes
                  </p>
                </td>
                <td>
                  <p className="bg-neutral-200 mb-2 w-32 h-6 font-semibold md:text-md text-sm lg:text-lg animate-blink" />
                </td>
              </tr>
              <tr>
                <td className="py-1 border-neutral-200 border-t border-b">
                  <p className="mt-1 font-medium md:text-md text-sm">Total</p>
                </td>
                <td className="py-1 border-neutral-200 border-t border-b">
                  <p className="bg-neutral-200 mb-2 w-32 h-6 font-semibold md:text-md text-sm lg:text-lg animate-blink" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CartViewSkeleton;

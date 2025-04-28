import CartSummarySkeleton from "../CartSummary/skeleton";

const CartViewSkeleton = () => {
  return (
    <div className="p-5 md:px-20 lg:px-48 lg:pt-12 lg:pb-10">
      <h1 className="font-bold text-3xl">Cart</h1>
      <div className="flex lg:flex-row flex-col-reverse lg:gap-5 mt-3 lg:mt-5">
        <div className="w-full lg:w-2/3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex gap-2 mb-2 w-full h-28 lg:h-36">
              <div className="bg-neutral-200 w-28 lg:w-36 h-28 lg:h-36 animate-pulse" />
              <div className="w-full">
                <div className="flex justify-between w-full">
                  <div className="bg-neutral-200 mb-2 w-1/2 h-5 lg:h-6 font-semibold md:text-md text-sm lg:text-lg animate-pulse" />
                  <div className="bg-neutral-200 w-1/3 h-5 lg:h-6 font-semibold md:text-md text-sm lg:text-lg animate-pulse" />
                </div>
                <div className="bg-neutral-200 mb-2 w-1/2 h-2 lg:h-4 font-semibold md:text-md text-sm lg:text-lg animate-pulse" />
                <div className="bg-neutral-200 mb-2 w-1/2 h-2 lg:h-4 font-semibold md:text-md text-sm lg:text-lg animate-pulse" />
                <div className="flex gap-2 mt-1">
                  <div className="bg-neutral-200 mb-2 w-20 h-4 lg:h-5 font-semibold md:text-md text-sm lg:text-lg animate-pulse" />
                  <div className="bg-neutral-200 mb-2 w-20 h-4 lg:h-5 font-semibold md:text-md text-sm lg:text-lg animate-pulse" />
                </div>
                <div className="flex gap-2 mt-1">
                  <div className="bg-neutral-200 mb-2 w-6 h-4 lg:h-5 font-semibold md:text-md text-sm lg:text-lg animate-pulse" />
                  <div className="bg-neutral-200 mb-2 w-6 h-4 lg:h-5 font-semibold md:text-md text-sm lg:text-lg animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-5 lg:w-1/3">
          <CartSummarySkeleton />
        </div>
      </div>
    </div>
  );
};

export default CartViewSkeleton;

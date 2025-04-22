import Title from "@/components/ui/Text/Title";
import CartSummarySkeleton from "../Cart/CartSummary/skeleton";

const CheckoutViewSkeleton = () => {
  return (
    <div className="p-5 md:px-20 lg:px-48 lg:pt-5 lg:pb-10">
      <Title>Checkout</Title>

      <div className="lg:flex gap-5 w-full">
        <div className="mt-3 lg:mt-5 p-2 w-full lg:w-2/3">
          <div
            className={`block bg-neutral-200 h-32  border border-neutral-200 rounded-lg animate-blink`}
          ></div>

          <p className="mt-3 lg:mt-5 font-semibold text-lg">ITEMS</p>
          {Array(3)
            .fill(0)
            .map((_, index) => {
              return (
                <div
                  key={index}
                  className="bg-neutral-200 mb-2 rounded w-full h-28 animate-blink"
                />
              );
            })}
        </div>

        <div className="lg:w-1/3">
          <CartSummarySkeleton />
        </div>
      </div>
    </div>
  );
};

export default CheckoutViewSkeleton;

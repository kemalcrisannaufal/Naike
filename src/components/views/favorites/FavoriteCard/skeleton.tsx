import Button from "@/components/ui/Button";

const FavoriteCardSkeleton = () => {
  return (
    <>
      <div>
        {/* Product Image */}
        <div>
          <div className="block z-10 bg-neutral-200 mb-2 w-full h-[200px] lg:h-[450px] overflow-hidden" />
        </div>
        {/* Product Details */}
        <div className="px-1 py-2">
          <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center">
            <div className="bg-neutral-200 w-full h-6 animate-pulse" />
            <div className="lg:hidden flex justify-between items-center gap-3 mt-2 w-full">
              <div className="bg-neutral-200 w-5/6 h-6 animate-pulse" />
              <div className="bg-neutral-200 w-1/6 h-6 animate-pulse" />
            </div>
          </div>

          <div className="bg-neutral-200 mt-2 w-full h-6 animate-pulse" />
        </div>

        <Button
          variant="secondary"
          classname="rounded-full px-5 mt-2"
          disabled={true}
        >
          <p className="font-medium text-md">Add to Cart</p>
        </Button>
      </div>
    </>
  );
};

export default FavoriteCardSkeleton;

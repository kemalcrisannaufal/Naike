import Button from "@/components/ui/Button";

const ProductDetailSkeleton = () => {
  return (
    <>
      <div className="flex lg:flex-row flex-col lg:px-48 lg:pt-5 lg:pb-10">
        <div className="lg:hidden block p-5">
          <div className="bg-neutral-200 mb-2 h-10 animate-pulse animate-pulse" />
          <div className="bg-neutral-200 mb-2 h-6 animate-pulse" />
          <div className="bg-neutral-200 h-6 animate-pulse" />
        </div>

        {/* Product Images */}
        <div className="flex lg:flex-row flex-col justify-end gap-4 w-full lg:w-2/3 h-[50vh] lg:h-[90vh]">
          {/* Rest Images */}
          <div className="hidden lg:flex flex-col items-end w-1/4 overflow-y-auto">
            {Array(7)
              .fill(0)
              .map((image, index) => {
                return (
                  <div
                    key={index}
                    className="bg-neutral-200 mb-2 rounded-lg w-20 h-20 overflow-hidden animate-pulse"
                  />
                );
              })}
          </div>
          {/* Main Image */}
          <div className="bg-neutral-200 w-full lg:w-3/4 h-[80vh] overflow-hidden animate-pulse" />
        </div>

        {/* Product Description */}
        <div className="p-5 lg:w-1/3">
          <div className="hidden lg:block">
            <h1 className="bg-neutral-200 mb-2 h-10 animate-pulse" />
            <p className="bg-neutral-200 mb-2 h-6 animate-pulse -600" />
            <p className="bg-neutral-200 animate-pulse" />
          </div>

          {/* Select Size */}
          <div className="mt-5 md:mt-10 lg:mt-16">
            <p className="lg:">Select Size</p>
            <div className="gap-2 grid grid-cols-4">
              {Array(8)
                .fill(0)
                .map((stock, index: number) => (
                  <div
                    key={index}
                    className="flex justify-center items-center bg-neutral-200 rounded w-full h-10 lg:h-12 animate-pulse"
                  />
                ))}
            </div>

            {/* Button Cart and Favourite */}
            <div>
              <Button
                type="button"
                classname="w-full py-2 lg:py-5 mt-6 rounded-l-full rounded-r-full"
              >
                <p className="">Add to Bag</p>
              </Button>
              <Button
                type="button"
                variant="secondary"
                classname="w-full py-2 lg:py-5 mt-2 rounded-l-full rounded-r-full"
              >
                <p className="">Favourite</p>
                <i className="bx bx-heart" />
              </Button>
            </div>

            {/* Product Description */}
            <div className="bg-neutral-200 mt-6 rounded h-40 animate-pulse" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailSkeleton;

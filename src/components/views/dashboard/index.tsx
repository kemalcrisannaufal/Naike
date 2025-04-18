import { Product } from "@/types/product.type";
import LatestProductCard from "./LatestProductCard";
import LatestProductCardSkeleton from "./LatestProductCard/skeleton";
import Image from "next/image";

const DashboardView = ({ latestProducts }: { latestProducts: Product[] }) => {
  return (
    <div className="lg:px-20 lg:py-10">
      {/* Banners */}
      <div className="flex justify-center items-center bg-neutral-200 w-full h-96">
        <Image
          src={"/assets/images/naike/logo.png"}
          alt={"naike"}
          width={500}
          height={500}
          className="w-1/3 object-contain"
        />
      </div>

      {/* Products */}
      <div className="mt-5 px-5 lg:px-0">
        <h1 className="font-semibold text-xl">Our Latest Products</h1>
        <div className="flex gap-2 md:gap-3 lg:gap-5 mt-2 overflow-x-auto">
          {latestProducts.length > 0
            ? latestProducts.map((item, index) => {
                return <LatestProductCard key={index} product={item} />;
              })
            : Array(3)
                .fill(0)
                .map((_, index) => {
                  return <LatestProductCardSkeleton key={index} />;
                })}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;

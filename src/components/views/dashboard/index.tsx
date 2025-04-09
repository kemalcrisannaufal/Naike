// import Image from "next/image";

import { Product } from "@/types/product.type";
import LatestProductCard from "./LatestProductCard";
import LatestProductCardSkeleton from "./LatestProductCard/skeleton";

// import Image from "next/image";

// type Proptypes = {
//   category?: {
//     name: string;
//     image: string;
//     url: string;
//   }[];
// };

const DashboardView = ({ latestProducts }: { latestProducts: Product[] }) => {
  // const { category } = props;
  return (
    <div className="lg:px-20 lg:py-10">
      {/* Banners */}
      <div className="bg-neutral-200 w-full h-96 animate-blink">
        {/* <Image
          src={"/assets/images/8360368.jpg"}
          alt={"banner"}
          width={1000}
          height={500}
          className="w-full h-full object-cover"
        /> */}
      </div>

      {/* Category */}
      {/* <div className="flex gap-3 mt-6 p-2 border border-neutral-200 rounded-md">
        {category.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center gap-2 shadow-md p-2 border border-neutral-200 rounded-md"
            >
              <div className="w-24 h-24 overflow-hidden">
                <Image
                  src={item.image}
                  width={100}
                  height={100}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {item.name}
            </div>
          );
        })}
      </div> */}

      {/* Products */}
      <div className="mt-5 px-5">
        <h1 className="font-semibold text-xl">Our Latest Products</h1>
        <div className="flex gap-2 md:gap-3 lg:gap-5 overflow-x-auto">
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

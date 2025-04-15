import { Product } from "@/types/product.type";
import CardProduct from "./Card";
import Link from "next/link";
import CardSkeleton from "./Card/skeleton";

type Proptypes = {
  products: Product[];
};

const ProductView = ({ products }: Proptypes) => (
  <div className="p-5 md:p-20">
    <div className="gap-2 md:gap-4 lg:gap-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.length === 0
        ? Array(8)
            .fill(0)
            .map((_, index) => {
              return <CardSkeleton key={index} />;
            })
        : products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <CardProduct product={product} key={product.id} />
            </Link>
          ))}
    </div>
  </div>
);

export default ProductView;

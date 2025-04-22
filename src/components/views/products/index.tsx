import { Product } from "@/types/product.type";
import CardProduct from "./Card";
import CardSkeleton from "./Card/skeleton";

type Proptypes = {
  products: Product[];
  isLoading: boolean;
};

const ProductView = (props: Proptypes) => {
  const { products, isLoading } = props;
  return (
    <div className="md:p-20 py-5">
      <div className="gap-2 md:gap-4 lg:gap-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? Array(8)
              .fill(0)
              .map((_, index) => {
                return <CardSkeleton key={index} />;
              })
          : products.map((product) => (
              <CardProduct product={product} key={product.id} />
            ))}
      </div>
    </div>
  );
};

export default ProductView;

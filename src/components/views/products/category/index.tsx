import { Product } from "@/types/product.type";
import CardProduct from "../Card";
import CardSkeleton from "../Card/skeleton";

type Proptypes = {
  products: Product[];
  isLoading: boolean;
};

const ProductsByCategoryView = (props: Proptypes) => {
  const { products, isLoading } = props;
  return (
    <div className="md:p-20 py-5">
      <div className="gap-2 md:gap-4 lg:gap-7 grid grid-cols-2 md:grid-cols-3">
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, index) => {
                return <CardSkeleton key={index} />;
              })
          : products.map((product: Product) => {
              return <CardProduct key={product.id} product={product} />;
            })}
      </div>
    </div>
  );
};

export default ProductsByCategoryView;

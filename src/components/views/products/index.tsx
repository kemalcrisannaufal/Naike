import { Product } from "@/types/product.type";
import CardProduct from "./Card";

type Proptypes = {
  products: Product[];
};

const ProductView = ({ products }: Proptypes) => (
  <>
    <div className="mb-5">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-800">
        Products
      </h1>
      <div className="flex gap-6 mt-2">
        <p className="text-sm md:text-md font-medium text-neutral-700">Men</p>
        <p className="text-sm md:text-md font-medium text-neutral-700">Women</p>
        <p className="text-sm md:text-md font-medium text-neutral-700">Kids</p>
      </div>
      <div className="h-[1px] bg-neutral-300 mt-2" />
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-7">
      {products.map((product) => (
        <CardProduct key={product.id} product={product} />
      ))}
      {products.map((product) => (
        <CardProduct key={product.id} product={product} />
      ))}
      {products.map((product) => (
        <CardProduct key={product.id} product={product} />
      ))}
    </div>
  </>
);

export default ProductView;

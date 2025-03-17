import { Product } from "@/types/product.type";
import CardProduct from "./Card";

type Proptypes = {
  products: Product[];
};

const ProductView = ({ products }: Proptypes) => (
  <div className="p-5 md:p-20">
    <div className="mb-5">
      <h1 className="font-semibold text-neutral-800 text-xl md:text-2xl lg:text-3xl">
        Products
      </h1>
      <div className="flex gap-6 mt-2">
        <p className="font-medium text-neutral-700 md:text-md text-sm">Men</p>
        <p className="font-medium text-neutral-700 md:text-md text-sm">Women</p>
        <p className="font-medium text-neutral-700 md:text-md text-sm">Kids</p>
      </div>
      <div className="bg-neutral-300 mt-2 h-[1px]" />
    </div>

    <div className="gap-2 md:gap-4 lg:gap-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <CardProduct key={product.id} product={product} />
      ))}
    </div>
  </div>
);

export default ProductView;

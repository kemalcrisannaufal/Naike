import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";

type Proptypes = {
  product: Product;
};

const CardProduct = (props: Proptypes) => {
  const { product } = props;
  return (
    <div className="shadow-lg pb-5 border border-neutral-100 w-full max-w-sm h-80 md:h-100">
      <div className="w-full h-3/5 md:h-3/4 overflow-hidden">
        <Image
          src={product.mainImage}
          alt={product.name}
          width={500}
          height={500}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="px-3 py-2">
        <p className="font-semibold text-lg line-clamp-2">{product.name}</p>
        <p className="mb-2 font-medium text-md text-neutral-600">
          {product.category}
        </p>
        <p className="font-semibold text-lg">{convertIDR(product.price)}</p>
      </div>
    </div>
  );
};

export default CardProduct;

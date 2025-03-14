import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";

type Proptypes = {
  product: Product;
  key: string;
};

const CardProduct = (props: Proptypes) => {
  const { product, key } = props;
  return (
    <div
      className="max-w-sm w-full h-80 md:h-96 border border-neutral-100 shadow-lg"
      key={key}
    >
      <div className="w-full h-3/5 md:h-3/4 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="px-3 py-2">
        <p className="text-lg font-semibold text-neutral-700">{product.name}</p>
        <p className="text-md font-medium text-neutral-600">
          {product.category}
        </p>
        <p className="text-lg font-semibold text-neutral-600">
          {convertIDR(product.price)}
        </p>
      </div>
    </div>
  );
};

export default CardProduct;

import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";

type Proptypes = {
  product: Product;
  key: string | undefined;
};

const CardProduct = (props: Proptypes) => {
  const { product, key } = props;
  return (
    <div
      className="shadow-lg border border-neutral-100 w-full max-w-sm h-80 md:h-96"
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
        <p className="font-semibold text-neutral-700 text-lg">{product.name}</p>
        <p className="font-medium text-md text-neutral-600">
          {product.category}
        </p>
        <p className="font-semibold text-neutral-600 text-lg">
          {convertIDR(product.price)}
        </p>
      </div>
    </div>
  );
};

export default CardProduct;

import { Product } from "@/types/product.type";
import Image from "next/image";
import Link from "next/link";

type Proptypes = {
  key: number;
  product: Product;
};
const LatestProductCard = (props: Proptypes) => {
  const { product, key } = props;
  return (
    <Link
      href={`/products/${product.id}`}
      key={key}
      className="group relative bg-neutral-200 md:w-full min-w-[320px] md:min-w-sm h-108 overflow-hidden"
    >
      <Image
        src={product.mainImage}
        height={500}
        width={500}
        alt={product.name}
        className="w-full h-full object-cover"
        priority
      />
      <div className="hidden group-hover:block bottom-0 absolute bg-gradient-to-t from-neutral-300 to-transparent p-5 w-full h-15">
        <p className="font-medium text-xl">{product.name}</p>
      </div>
    </Link>
  );
};

export default LatestProductCard;

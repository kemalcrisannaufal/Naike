/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cart } from "@/types/cart.type";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import Link from "next/link";

type Proptypes = {
  cartItem: Cart;
  product: Product | any;
};

const CheckoutCard = (props: Proptypes) => {
  const { product, cartItem } = props;

  return (
    <div className="flex gap-2 mb-2 w-full h-32 lg:h-36">
      <div className="w-36 lg:w-36 h-32 lg:h-36 overflow-hidden">
        {product?.mainImage && (
          <Link href={`/products/${product.id}`}>
            <Image
              src={product.mainImage}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-full object-cover"
              priority
            />
          </Link>
        )}
      </div>

      <div className="w-full">
        {/* Product Name */}
        <div className="md:flex justify-between w-full overflow-ellipsis">
          <p className="w-full md:w-2/3 font-semibold md:text-md text-sm lg:text-lg line-clamp-1">
            {product?.name}
          </p>
          <p className="mt-0.5 md:mt-0 w-full md:w-1/3 font-semibold md:text-md text-sm lg:text-lg md:text-right line-clamp-1">
            {convertIDR(product?.price ?? 0)}
          </p>
        </div>

        {/* Product Details */}
        <div>
          <p className="mt-0.5 md:mt-1 font-medium text-neutral-600 lg:text-md text-xs line-clamp-1">
            {product?.category}
          </p>
          <p className="mt-0.5 md:mt-1 font-medium text-neutral-600 lg:text-md text-xs line-clamp-1">
            {product?.colourShown}
          </p>

          {/* Size */}
          <p className="mt-0.5 md:mt-1 font-medium text-xs md:text-xs line-clamp-1">
            Size : <span className="font-semibold">{cartItem.size}</span>
          </p>

          {/* Quantity */}
          <p className="mt-0.5 md:mt-1 font-medium text-xs md:text-xs line-clamp-1">
            Quantity : <span className="font-semibold">{cartItem.qty}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;

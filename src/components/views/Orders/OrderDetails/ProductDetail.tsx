import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Order } from "@/types/orders.type";
import { Product } from "@/types/product.type";

type Proptypes = {
  order: Order;
  products: Product[];
};

const ProductDetail = (props: Proptypes) => {
  const { order, products } = props;
  const [showAllProducts, setShowAllProducts] = useState(false); //
  return (
    <div className="mt-5 px-5 py-2 border border-neutral-200 w-full">
      <p className="mb-3 font-semibold text-md">Product Detail</p>
      {order.items.map((item, index) => {
        const product = products.find(
          (product) => product.id === item.productId
        );

        return (
          <div
            key={product!.id}
            className={`flex gap-5 mb-2 ${
              index > 0 && !showAllProducts && "hidden"
            }`}
          >
            <div className="w-20 h-20">
              <Image
                src={product!.mainImage}
                width={100}
                height={100}
                alt={product!.name}
                priority
                className="w-full h-full object-cover"
              />
            </div>
            <Link href={`/products/${product!.id}`}>
              <p className="font-semibold text-md md:text-lg">
                {product?.name}
              </p>
              <p className="text-neutral-500 text-xs md:text-sm">
                {item.qty} x {convertIDR(product!.price)}
              </p>
            </Link>
          </div>
        );
      })}

      {order.items.length > 1 && (
        <button
          onClick={() => setShowAllProducts(!showAllProducts)}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-1">
            <p className="font-semibold text-xs md:text-sm">
              {!showAllProducts ? "Show All Products" : "Show Less"}
            </p>
            <i
              className={`block bx text-xl md:text-2xl ${
                showAllProducts ? "bx-chevron-up" : "bx-chevron-down"
              }`}
            />
          </div>
        </button>
      )}
    </div>
  );
};

export default ProductDetail;

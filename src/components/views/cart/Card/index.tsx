/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from "@/components/ui/Select";
import { Cart } from "@/types/cart.type";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import ActionButton from "./ActionButton";

type Proptypes = {
  cartItem: Cart;
  product: Product | any;
  handleDelete: (id: string, size: string) => void;
  handleOnChangeSize: (selectedSize: string, productId: string) => void;
  handleOnClickQty: (
    size: string,
    qty: number,
    type: string,
    productId: string,
    setCartItemQty: Dispatch<SetStateAction<number>>
  ) => void;
};

const CartCard = (props: Proptypes) => {
  const {
    product,
    cartItem,
    handleDelete,
    handleOnChangeSize,
    handleOnClickQty,
  } = props;

  const [cartItemQty, setCartItemQty] = useState(cartItem.qty);

  return (
    <div className="flex gap-2 mb-2 w-full h-32 lg:h-36">
      <div className="w-32 lg:w-36 h-32 lg:h-36 overflow-hidden">
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
        <div className="flex justify-between w-full overflow-ellipsis">
          <p className="w-2/3 font-semibold md:text-md text-sm lg:text-lg line-clamp-1">
            {product?.name}
          </p>
          <p className="w-1/3 font-semibold md:text-md text-sm lg:text-lg line-clamp-1">
            {convertIDR(product?.price ?? 0)}
          </p>
        </div>

        {/* Product Details */}
        <div>
          <p className="mt-1 font-medium text-neutral-600 lg:text-md text-xs line-clamp-1">
            {product?.category}
          </p>
          <p className="mt-1 font-medium text-neutral-600 lg:text-md text-xs line-clamp-1">
            {product?.colourShown}
          </p>
        </div>

        {/* Size */}
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-2">
            <p className="font-medium text-neutral-600 text-xs md:text-xs line-clamp-1">
              Size
            </p>
            <Select
              name={`size-${cartItem.productId}`}
              variant="tight"
              onChange={(e: any) =>
                handleOnChangeSize(e.target.value, cartItem.productId)
              }
              options={
                product?.stock
                  .filter((item: { size: string; qty: number }) => item.qty > 0)
                  .map((item: { size: string; qty: number }) => {
                    return {
                      label: item.size,
                      value: item.size,
                    };
                  }) || []
              }
              defaultValue={cartItem.size}
            />
          </div>

          {/* Quantity */}
          <div className="flex items-center">
            <p className="font-medium text-neutral-600 text-xs md:text-xs line-clamp-1">
              Quantity
            </p>
            <div className="flex items-center gap-2 ml-2">
              <ActionButton
                icon="bx-minus"
                disabled={cartItemQty <= 1}
                onClick={() =>
                  handleOnClickQty(
                    cartItem.size,
                    cartItemQty,
                    "subtract",
                    cartItem.productId,
                    setCartItemQty
                  )
                }
              />
              <p className="font-medium text-neutral-600 text-xs md:text-xs line-clamp-1">
                {cartItemQty}
              </p>
              <ActionButton
                icon="bx-plus"
                disabled={
                  cartItemQty ===
                  product.stock.find(
                    (item: { size: string; qty: number }) =>
                      item.size === cartItem.size
                  )!.qty
                }
                onClick={() =>
                  handleOnClickQty(
                    cartItem.size,
                    cartItemQty,
                    "add",
                    product.id,
                    setCartItemQty
                  )
                }
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-1">
          <ActionButton icon="bx-heart" />
          <ActionButton
            icon="bx-trash"
            onClick={() => handleDelete(cartItem.productId, cartItem.size)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartCard;

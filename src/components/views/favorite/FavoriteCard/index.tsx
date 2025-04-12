import Button from "@/components/ui/Button";
import { Favorite } from "@/types/favorite.type";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ModalSelectSize from "./ModalSelectSize";

type Proptypes = {
  product: Product;
  handleDeleteFavorite: (productId: string) => void;
  isProductInCart: boolean;
  favorite: Favorite;
  handleAddToCart: (productId: string, size: string) => void;
};

const FavoriteCard = (props: Proptypes) => {
  const {
    product,
    handleDeleteFavorite,
    isProductInCart,
    favorite,
    handleAddToCart,
  } = props;
  const [selectedSizeModal, setSelectedSizeModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(favorite.size);

  return (
    <>
      <div>
        {/* Product Image */}
        <div className="relative">
          <Link
            href={`/products/${product.id}`}
            className="block z-10 mb-2 w-full h-[200px] lg:h-[450px] overflow-hidden"
          >
            <Image
              src={product.mainImage}
              width={500}
              height={500}
              alt={product.name}
              priority
              className="w-full h-full object-cover"
            />
          </Link>
          <button
            className="top-2 right-2 z-20 absolute flex justify-center items-center bg-white p-1 rounded-full cursor-pointer"
            onClick={() => handleDeleteFavorite(product.id!)}
          >
            <i className="text-xl md:text-3xl bx bxs-heart" />
          </button>
        </div>

        {/* Product Details */}
        <div className="mt-3">
          <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center">
            <p className="lg:max-w-2/3 font-semibold md:text-md text-sm lg:text-lg line-clamp-1 lg:line-clamp-2">
              {product.name}
            </p>
            <div className="lg:hidden flex justify-between items-center w-full">
              <p className="font-medium text-md text-neutral-600 line-clamp-2">
                {product.category}
              </p>
              <p className="font-medium text-neutral-600 text-xs line-clamp-2">
                ({favorite.size || "N/A"})
              </p>
            </div>

            <p className="lg:max-w-1/3 font-semibold text-md lg:text-lg line-clamp-1 lg:line-clamp-2">
              {convertIDR(product.price)}
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="hidden lg:block mb-2 font-medium text-md text-neutral-600 line-clamp-2">
              {product.category}
            </p>
            <p className="hidden lg:block mb-2 font-medium text-neutral-600 text-sm line-clamp-2">
              Size ({favorite.size || "Unselected"})
            </p>
          </div>
        </div>

        {/* Action */}
        <Button
          variant="secondary"
          classname="rounded-full px-5 mt-2"
          disabled={isProductInCart}
          onClick={
            selectedSize === ""
              ? () => setSelectedSizeModal(true)
              : () => handleAddToCart(product.id!, selectedSize)
          }
        >
          {isProductInCart ? (
            <div className="flex items-center gap-2">
              <i className="text-green-600 text-xl bx bxs-check-circle" />
              <p className="font-medium text-md">Added</p>
            </div>
          ) : (
            <p className="font-medium text-md">Add to Cart</p>
          )}
        </Button>
      </div>

      {/* Modal for selecting size */}
      {selectedSizeModal && (
        <ModalSelectSize
          onClose={() => setSelectedSizeModal(false)}
          product={product}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          handleAddToCart={handleAddToCart}
        />
      )}
    </>
  );
};

export default FavoriteCard;

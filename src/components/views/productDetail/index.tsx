import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
// import Image from "next/image";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useState } from "react";

type Proptypes = {
  product: Product;
};

const ProductDetailView = (props: Proptypes) => {
  const { product } = props;
  const [imageShow, setImageShow] = useState(product.mainImage);

  return (
    <div className="flex px-48 py-20">
      <div className="flex justify-end gap-4 w-2/3">
        <div className="flex flex-col items-end w-1/4">
          {product.images &&
            product.images.map((image, index) => {
              return (
                <button
                  key={index}
                  className="mb-2 w-20 h-20 cursor-pointer"
                  onMouseEnter={() => setImageShow(image)}
                >
                  <Image
                    src={image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
        </div>
        <div className="w-3/4 overflow-hidden">
          <Image
            src={imageShow}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-[75%] object-cover"
          />
        </div>
      </div>
      <div className="p-5 w-1/3">
        <div>
          <h1 className="font-semibold text-neutral-700 text-3xl">
            {product.name}
          </h1>
          <p className="font-medium text-neutral-600 text-lg">
            {product.category}
          </p>
          <p className="mt-2 font-[500] text-black text-lg">
            {convertIDR(product.price)}{" "}
          </p>
        </div>
        <div className="mt-16">
          <p className="font-medium text-neutral-800 text-lg">Select Size</p>
          <div className="gap-2 grid grid-cols-4">
            {product.stock &&
              product.stock.map((stock, index: number) => (
                <label
                  key={index}
                  htmlFor={`size-${index}`}
                  className="flex justify-center items-center hover:bg-gray-100 border border-neutral-200 rounded w-full h-12 cursor-pointer"
                >
                  <input
                    type="radio"
                    id={`size-${index}`}
                    name="size"
                    value={stock.size}
                    className="peer hidden"
                  />
                  <span className="flex justify-center items-center peer-checked:bg-primary rounded w-full h-full peer-checked:text-white text-sm">
                    {stock.size}
                  </span>
                </label>
              ))}
          </div>
          <Button
            type="button"
            classname="w-full py-5 mt-6 rounded-l-full rounded-r-full "
          >
            <p className="text-lg">Add to Bag</p>
          </Button>
          <Button
            type="button"
            variant="secondary"
            classname="w-full py-5 mt-2 rounded-l-full rounded-r-full"
          >
            <p className="text-lg">Favourite</p>
            <i className="text-2xl bx bx-heart" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;

import Modal from "@/components/ui/Modal";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type Proptypes = {
  product: Product;
  setProductDetail: Dispatch<SetStateAction<boolean>>;
};

const ProductDetailDescription = (props: Proptypes) => {
  const { setProductDetail, product } = props;
  return (
    <Modal onClose={() => setProductDetail(false)}>
      {/* Product Image and Price */}
      <div className="flex items-center gap-2">
        <Image
          src={product.mainImage}
          alt={product.name}
          width={500}
          height={500}
          className="w-20 h-20 object-cover"
          priority
        />
        <div>
          <p className="font-medium text-lg">{product.name}</p>
          <p className="font-medium text-lg">{convertIDR(product.price)}</p>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-6 px-4">
        <p className="font-medium md:text-md text-sm lg:text-lg">
          {product.description}
        </p>
      </div>

      {/* Benefits */}
      <div className="mt-6 px-4">
        <p className="font-semibold text-lg lg:text-xl">Benefits</p>
        <ul className="ml-5 list-disc">
          {product.benefits?.map((benefit: string, index: number) => {
            return (
              <li key={index}>
                <p className="font-medium md:text-md text-sm lg:text-lg">
                  {benefit}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Details */}
      <div className="mt-6 px-4">
        <p className="font-semibold text-lg lg:text-xl">Product details</p>
        <ul className="ml-5 list-disc">
          {product.details?.map((detail: string, index: number) => {
            return (
              <li key={index}>
                <p className="font-medium md:text-md text-sm lg:text-lg">
                  {detail}
                </p>
              </li>
            );
          })}
          <li>
            <p className="font-medium md:text-md text-sm lg:text-lg">
              Colour Shown:{product.colourShown}
            </p>
          </li>
          <li>
            <p className="font-medium md:text-md text-sm lg:text-lg">
              Style:{product.style}
            </p>
          </li>
          <li>
            <p className="font-medium md:text-md text-sm lg:text-lg">
              Country/Region:{product.country}
            </p>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default ProductDetailDescription;

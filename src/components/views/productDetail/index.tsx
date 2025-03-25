import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import ProductDetailDescription from "./ProductDetailDescription";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useState } from "react";

type Proptypes = {
  product: Product;
};

const ProductDetailView = (props: Proptypes) => {
  const { product } = props;
  const [imageShow, setImageShow] = useState(product.mainImage);
  const [productDetail, setProductDetail] = useState(false);
  const [deliveryDetailShow, setDeliveryDetailShow] = useState(false);

  return (
    <>
      <div className="flex lg:flex-row flex-col lg:px-48 lg:pt-5 lg:pb-10">
        <div className="lg:hidden block p-5">
          <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl">
            {product.name}
          </h1>
          <p className="font-medium text-neutral-600 md:text-md text-sm lg:text-lg">
            {product.category}
          </p>
          <p className="mt-2 font-medium text-md md:text-lg lg:text-xl">
            {convertIDR(product.price)}{" "}
          </p>
        </div>

        {/* Product Images */}
        <div className="lg:top-20 lg:sticky flex lg:flex-row flex-col justify-end gap-4 w-full lg:w-2/3 lg:h-[90vh]">
          {/* Rest Images */}
          <div className="hidden lg:flex flex-col items-end w-1/4 overflow-y-auto">
            {product.images &&
              [product.mainImage, ...product.images].map((image, index) => {
                return (
                  <div
                    key={index}
                    onMouseEnter={() => setImageShow(image)}
                    className="relative mb-2 rounded-lg w-20 h-20 overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt={product.name}
                      width={500}
                      height={500}
                      className="w-20 h-20 object-cover cursor-pointer"
                      priority
                    />
                    <div
                      className={`top-0 left-0 absolute w-full h-full ${
                        imageShow === image ? "bg-black/25" : "bg-transparent"
                      }`}
                    />
                  </div>
                );
              })}
          </div>
          {/* Main Image */}
          <div className="relative w-full lg:w-3/4 overflow-hidden">
            <Image
              src={imageShow}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-full object-cover"
              priority
            />
            <div className="lg:hidden bottom-5 absolute flex justify-center gap-1 w-full">
              {product.images &&
                Array(product.images.length + 1)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <button
                        key={index}
                        className={`rounded-full w-3 h-3 ${
                          imageShow ===
                          (index === 0
                            ? product.mainImage
                            : product.images[index])
                            ? "bg-black"
                            : "bg-neutral-200"
                        }
                        `}
                        onClick={() =>
                          setImageShow(
                            index === 0
                              ? product.mainImage
                              : product.images[index]
                          )
                        }
                      />
                    );
                  })}
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="p-5 lg:w-1/3">
          <div className="hidden lg:block">
            <h1 className="font-semibold text-3xl">{product.name}</h1>
            <p className="font-medium text-neutral-600 text-lg">
              {product.category}
            </p>
            <p className="mt-2 font-medium text-xl">
              {convertIDR(product.price)}{" "}
            </p>
          </div>

          {/* Select Size */}
          <div className="mt-5 md:mt-10 lg:mt-16">
            <p className="font-semibold text-md lg:text-lg">Select Size</p>
            <div className="gap-2 grid grid-cols-4">
              {product.stock &&
                product.stock.map((stock, index: number) => (
                  <label
                    key={index}
                    htmlFor={`size-${index}`}
                    className="flex justify-center items-center hover:bg-gray-100 border border-neutral-200 rounded w-full h-10 lg:h-12 cursor-pointer"
                  >
                    <input
                      type="radio"
                      id={`size-${index}`}
                      name="size"
                      value={stock.size}
                      className="peer hidden"
                    />
                    <span className="flex justify-center items-center peer-checked:border-2 peer-checked:border-primary rounded w-full h-full text-md lg:text-lg">
                      {stock.size}
                    </span>
                  </label>
                ))}
            </div>

            {/* Button Cart and Favourite */}
            <div>
              <Button
                type="button"
                classname="w-full py-2 lg:py-5 mt-6 rounded-l-full rounded-r-full"
              >
                <p className="text-lg">Add to Bag</p>
              </Button>
              <Button
                type="button"
                variant="secondary"
                classname="w-full py-2 lg:py-5 mt-2 rounded-l-full rounded-r-full"
              >
                <p className="text-lg">Favourite</p>
                <i className="text-2xl bx bx-heart" />
              </Button>
            </div>

            {/* Product Description */}
            <div className="mt-5 md:mt-10 lg:mt-16">
              <p className="font-medium md:text-md text-sm lg:text-lg text-justify">
                {product.description}
              </p>

              <ul className="mt-6 ml-10 list-disc">
                <li>
                  <p className="font-medium md:text-md text-sm lg:text-lg text-justify">
                    Colour Shown:{product.colourShown}
                  </p>
                </li>
                <li>
                  <p className="font-medium md:text-md text-sm lg:text-lg text-justify">
                    Style:{product.style}
                  </p>
                </li>
                <li>
                  <p className="font-medium md:text-md text-sm lg:text-lg text-justify">
                    Country/Region:{product.country}
                  </p>
                </li>
              </ul>

              <button
                className="mt-4 cursor-pointer"
                onClick={() => setProductDetail(true)}
              >
                <p className="font-bold text-md lg:text-lg underline">
                  View Product Details
                </p>
              </button>

              <div className="mt-5 lg:mt-10">
                <button
                  className="flex justify-between w-full cursor-pointer"
                  onClick={() => setDeliveryDetailShow(!deliveryDetailShow)}
                >
                  <p className="font-semibold text-md md:text-lg lg:text-xl">
                    Delivery and Returns
                  </p>
                  <i
                    className={`text-2xl lg:text-3xl bx ${
                      deliveryDetailShow ? "bx-chevron-up" : "bx-chevron-down"
                    }`}
                  />
                </button>
                <div
                  className={`${deliveryDetailShow ? "block" : "hidden"} mt-2`}
                >
                  <p className="md:text-md text-sm lg:text-lg text-justify">
                    We provide fast and secure delivery to ensure your order
                    arrives safely at your doorstep. If you’re not completely
                    satisfied with your purchase, you can return the item within
                    7 days of receiving it, as long as it remains unused and in
                    its original condition. Your satisfaction is our priority
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {productDetail && (
        <ProductDetailDescription
          setProductDetail={setProductDetail}
          product={product}
        />
      )}
    </>
  );
};

export default ProductDetailView;

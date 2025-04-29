import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import ProductDetailDescription from "./ProductDetailDescription";
import Button from "@/components/ui/Button";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { userServices } from "@/services/user";
import { Cart } from "@/types/cart.type";
import { Favorite } from "@/types/favorite.type";
import { ToasterContext } from "@/contexts/ToasterContext";
import ProductToaster from "@/components/ui/Toaster/ProductToaster";

type Proptypes = {
  product: Product;
  cart: Cart[];
  productId: string;
  favorites: Favorite[];
  setCart: Dispatch<SetStateAction<Cart[]>>;
  setFavorites: Dispatch<SetStateAction<Favorite[]>>;
};

const ProductDetailView = (props: Proptypes) => {
  const { product, cart, productId, favorites, setCart, setFavorites } = props;
  const { setToaster } = useContext(ToasterContext);
  const [imageShow, setImageShow] = useState(product.mainImage);
  const [productDetail, setProductDetail] = useState(false);
  const [deliveryDetailShow, setDeliveryDetailShow] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const { status } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsFavorite(
      status === "unauthenticated"
        ? false
        : favorites && favorites.some((item) => item.productId === productId)
    );
  }, [status, favorites, productId]);

  const handleAddToCart = async () => {
    if (selectedSize != "") {
      let newCart = [];
      if (cart) {
        if (
          cart.filter(
            (item: Cart) =>
              item.productId === productId && item.size === selectedSize
          ).length > 0
        ) {
          newCart = cart.map((item: Cart) => {
            if (item.productId === productId && item.size === selectedSize) {
              item.qty += 1;
            }
            return item;
          });
        } else {
          newCart = [...cart, { productId, size: selectedSize, qty: 1 }];
        }
      } else {
        newCart = [{ productId, size: selectedSize, qty: 1 }];
      }

      try {
        const data: { cart: Cart[] } = {
          cart: newCart,
        };
        const result = await userServices.addToCart(data);
        if (result.status === 200) {
          setSelectedSize("");
          setCart(newCart);
          setToaster({
            variant: "custom",
            message: "Added to cart successfully!",
            children: (
              <ProductToaster
                image={product.mainImage}
                {...product}
                size={selectedSize}
                actionLabel="View Cart"
                actionOnClick={() => router.push("/cart")}
              />
            ),
          });
        } else {
          setToaster({
            variant: "error",
            message: "Failed to add to cart. Please try again",
          });
        }
      } catch (error) {
        console.log(error);
        setToaster({
          variant: "error",
          message: "Failed to add to cart. Please try again",
        });
      }
    } else {
      setToaster({
        variant: "error",
        message: "Please select a size",
      });
    }
  };

  const handleAddToFavourite = async () => {
    let data: { favorites: Favorite[] } = { favorites: [] };
    if (favorites && favorites.length > 0) {
      data = {
        favorites: [...favorites, { productId, size: selectedSize || "" }],
      };
    } else {
      data = {
        favorites: [{ productId, size: selectedSize || "" }],
      };
    }

    const result = await userServices.addToFavorite(data);

    if (result.status === 200) {
      setFavorites(data.favorites);
      setIsFavorite(true);
      setToaster({
        variant: "custom",
        message: "Added to favourite successfully!",
        children: (
          <ProductToaster
            image={product.mainImage}
            {...product}
            size={selectedSize || ""}
            actionLabel="View Favourite"
            actionOnClick={() => router.push("/favorite")}
          />
        ),
      });
    } else {
      setToaster({
        variant: "error",
        message: "Failed to add to favourite. Please try again",
      });
    }
  };

  return (
    <>
      <div className="flex lg:flex-row flex-col md:px-20 lg:px-48 lg:pt-5 lg:pb-10">
        {/* Product Description for Mobile */}
        <div className="lg:hidden block p-5">
          <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl">
            {product.name}
          </h1>
          <p className="font-medium text-neutral-600 md:text-md text-sm lg:text-lg">
            {product.category}
          </p>
          <p className="mt-2 font-medium text-md md:text-lg lg:text-xl">
            {convertIDR(product.price)}
          </p>
        </div>

        {/* Product Images */}
        <div className="lg:top-20 lg:sticky flex md:flex-row flex-col-reverse justify-end gap-4 w-full lg:w-2/3 lg:h-[90vh]">
          {/* Rest Images */}
          <div className="flex md:flex-col items-end gap-2 lg:gap-0 w-full md:w-1/6 overflow-x-scroll overflow-y-auto scrollbar-hide">
            {product.images &&
              [product.mainImage, ...product.images].map((image, index) => {
                return (
                  <div
                    key={index}
                    onMouseEnter={() => setImageShow(image)}
                    className="relative lg:mb-2 rounded-lg w-20 min-w-20 h-20 min-h-20 overflow-hidden"
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
          <div className="relative w-full md:w-5/6 overflow-hidden">
            {imageShow ? (
              <Image
                src={imageShow}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
                priority
              />
            ) : null}
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
                product.stock
                  .sort((a, b) => a.size.localeCompare(b.size))
                  .map((stock, index: number) => (
                    <label
                      key={index}
                      htmlFor={`size-${index}`}
                      className={`flex justify-center items-center  border border-neutral-200 rounded w-full h-10 lg:h-12 cursor-pointer ${
                        stock.qty > 0 && "hover:bg-neutral-100 cursor-default"
                      }`}
                    >
                      <input
                        type="radio"
                        id={`size-${index}`}
                        name="size"
                        value={stock.size}
                        className="peer hidden"
                        disabled={stock.qty === 0}
                        onChange={() => setSelectedSize(stock.size)}
                        checked={selectedSize === stock.size}
                      />
                      <span
                        className={`flex justify-center items-center rounded w-full h-full text-md lg:text-lg ${
                          stock.qty > 0
                            ? "peer-checked:border-2 peer-checked:border-primary "
                            : "text-neutral-400"
                        }`}
                      >
                        {stock.size}
                      </span>
                    </label>
                  ))}
            </div>

            {/* Button Cart and Favourite */}
            <div>
              <Button
                type={status === "authenticated" ? "submit" : "button"}
                classname="w-full py-2 lg:py-5 mt-6 rounded-l-full rounded-r-full"
                onClick={() => {
                  return status === "authenticated"
                    ? handleAddToCart()
                    : router.push(`/auth/login?callbackUrl=${router.asPath}`);
                }}
              >
                <p className="text-lg">Add to Cart</p>
              </Button>

              <Button
                type="button"
                variant="secondary"
                classname="w-full py-2 lg:py-5 mt-2 rounded-l-full rounded-r-full"
                disabled={isFavorite}
                onClick={() => {
                  return status === "authenticated"
                    ? handleAddToFavourite()
                    : router.push(`/auth/login?callbackUrl=${router.asPath}`);
                }}
              >
                {isFavorite ? (
                  <div className="flex items-center gap-2">
                    <i className="text-green text-green-600 text-2xl bx bxs-check-circle" />
                    <p className="text-lg">Favourited</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="text-lg">Favourite</p>
                    <i className="text-2xl bx bx-heart" />
                  </div>
                )}
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

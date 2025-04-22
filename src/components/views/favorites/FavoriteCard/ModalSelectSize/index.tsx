import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";

type Proptypes = {
  product: Product;
  onClose: () => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  handleAddToCart: (productId: string, size: string) => void;
};

const ModalSelectSize = (props: Proptypes) => {
  const { product, onClose, selectedSize, setSelectedSize, handleAddToCart } =
    props;
  return (
    <Modal onClose={onClose}>
      <div className="flex gap-2 lg:gap-5">
        <div className="w-1/2">
          <Image
            src={product.mainImage}
            width={500}
            height={500}
            alt={product.name}
            priority
            className="w-48 md:w-full h-52 md:h-full object-cover"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <div className="flex-grow">
            <p className="font-medium text-neutral-600 md:text-md text-sm lg:text-lg line-clamp-1 lg:line-clamp-2">
              {product.category}
            </p>
            <p className="font-semibold text-md lg:text-xl line-clamp-1 lg:line-clamp-2 tracking-tight">
              {product.name}
            </p>
            <p className="font-medium text-md text-neutral-700 lg:text-xl line-clamp-1 lg:line-clamp-2 tracking-tight">
              {convertIDR(product.price)}
            </p>
          </div>

          <div className="mt-5 md:mt-12">
            <p className="font-medium lg:text-md text-sm">Select Size</p>
            <div className="flex gap-2 md:grid md:grid-cols-4 mt-2 overflow-y-auto">
              {product.stock &&
                product.stock.map((stock, index: number) => (
                  <label
                    key={index}
                    htmlFor={`size-${index}`}
                    className={`flex justify-center items-center min-w-12 border border-neutral-200 rounded w-full h-10 lg:h-12 cursor-pointer ${
                      stock.qty > 0 && "hover:bg-neutral-100 cursor-default"
                    }`}
                  >
                    <input
                      type="radio"
                      id={`size-${index}`}
                      name="size"
                      value={stock.size}
                      className="peer hidden w-full"
                      disabled={stock.qty === 0}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      checked={stock.size === selectedSize}
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
          </div>
          <Button
            classname="w-full rounded-full mt-5"
            onClick={() => {
              handleAddToCart(product.id!, selectedSize);
              onClose();
            }}
          >
            <p className="font-semibold md:text-md text-sm lg:text-lg">
              Add to Cart
            </p>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSelectSize;

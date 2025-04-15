import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import Button from "../../Button";

type Proptypes = {
  image: string;
  name: string;
  price: number;
  size?: string;
  category: string;
  actionLabel: string;
  actionOnClick: () => void;
};

const ProductToaster = (props: Proptypes) => {
  const { image, name, category, price, size, actionLabel, actionOnClick } =
    props;
  return (
    <div>
      <div className="flex gap-2 p-2 w-full">
        {/* Image */}
        <div className="w-24 md:w-32 h-24 md:h-32 overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={100}
            height={100}
            priority
            className="w-full h-full object-cover"
          />
        </div>

        {/* Detail */}
        <div>
          <p className="font-semibold text-md md:text-lg line-clamp-2">
            {name}
          </p>
          <p className="font-medium text-neutral-700 text-xs md:text-sm line-clamp-1">
            {category}
          </p>
          {size && (
            <p className="mb-2 font-medium text-neutral-700 text-xs md:text-sm line-clamp-1">
              Size: {size}
            </p>
          )}

          <p className="font-semibold text-lg md:text-xl line-clamp-1">
            {convertIDR(price)}
          </p>
        </div>
      </div>

      {/* Action */}
      <div>
        <Button onClick={actionOnClick} classname="w-full rounded-full">
          {actionLabel}
        </Button>
      </div>
    </div>
  );
};

export default ProductToaster;

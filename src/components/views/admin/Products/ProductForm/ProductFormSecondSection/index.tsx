/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import InputGroup from "@/components/ui/InputGroup";
import TextArea from "@/components/ui/TextArea";
import { Product } from "@/types/product.type";
import { Dispatch, SetStateAction } from "react";

type Proptypes = {
  handleSubmit: (e: any) => void;
  productInfo: Product;
  setProductInfo: Dispatch<SetStateAction<Product>>;
  setFirstPage: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
};

const ProductFormSecondSection = (props: Proptypes) => {
  const { handleSubmit, setProductInfo, productInfo, setFirstPage, isLoading } =
    props;
  return (
    <form onSubmit={handleSubmit} className="mt-3">
      {/* Product Description */}
      <InputGroup title="Product Description">
        <TextArea
          label="Description"
          name="description"
          onChange={(e: any) =>
            setProductInfo({ ...productInfo, description: e.target.value })
          }
          defaultValue={productInfo.description}
        />
      </InputGroup>

      {/* Product Benefit */}
      <InputGroup title="Product Benefit">
        {productInfo.benefits!.map((item: string, index: number) => (
          <div key={index}>
            <Input
              label={`Benefit ${index + 1}`}
              name={`benefit-${index}`}
              placeholder="Input benefit"
              type="text"
              onChange={(e: any) => {
                const newBenefits = [...productInfo.benefits!];
                newBenefits[index] = e.target.value;
                setProductInfo({ ...productInfo, benefits: newBenefits });
              }}
              defaultValue={item}
            />
          </div>
        ))}
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={() => {
              setProductInfo({
                ...productInfo,
                benefits: [...productInfo.benefits!, ""],
              });
            }}
          >
            <i className="bx bx-plus" />
          </Button>
        </div>
      </InputGroup>

      <InputGroup title="Product Detail">
        <Input
          label="Colour Shown"
          name="colour"
          placeholder="Colour Shown"
          type="text"
          onChange={(e: any) =>
            setProductInfo({ ...productInfo, colourShown: e.target.value })
          }
          defaultValue={productInfo.colourShown}
        />
        <Input
          label="Style"
          name="productStyle"
          placeholder="Style"
          type="text"
          onChange={(e: any) =>
            setProductInfo({ ...productInfo, style: e.target.value })
          }
          defaultValue={productInfo.style}
        />
        <Input
          label="Country/Region of Origin"
          name="country"
          placeholder="Country/Region of Origin"
          type="text"
          onChange={(e: any) =>
            setProductInfo({ ...productInfo, country: e.target.value })
          }
          defaultValue={productInfo.country}
        />

        <p className="mt-6 mb-2 font-semibold text-md text-neutral-700">
          More Details
        </p>
        {productInfo.details!.map((item: any, index: number) => (
          <div key={index}>
            <Input
              label={`Detail ${index + 1}`}
              name={`detail-${index}`}
              placeholder="Input detail"
              type="text"
              onChange={(e: any) => {
                const newDetails = [...productInfo.details!];
                newDetails[index] = e.target.value;
                setProductInfo({ ...productInfo, details: newDetails });
              }}
              defaultValue={item}
            />
          </div>
        ))}
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={() => {
              setProductInfo({
                ...productInfo,
                details: [...productInfo.details!, ""],
              });
            }}
          >
            <i className="bx bx-plus" />
          </Button>
        </div>
      </InputGroup>

      <div className="flex gap-2">
        <Button
          type="button"
          classname="mt-4 w-full"
          onClick={() => setFirstPage(true)}
        >
          <i className="bx-chevrons-left text-xl bx" />
          Previous Page
        </Button>
        <Button type="submit" classname="mt-4 w-full">
          <i className="text-xl bx bx-save" />
          {isLoading ? "Saving..." : "Save Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductFormSecondSection;

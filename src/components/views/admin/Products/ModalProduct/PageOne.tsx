/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import InputFile from "@/components/ui/InputFile";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select";
import Image from "next/image";

type Proptypes = {
  mainImage: any;
  setMainImage: any;
  handleOnChangeMainImage: any;
  images: any;
  stockCount: any;
  setStockCount: any;
  handleOnChangeImages: any;
  setFirstPage: any;
  handleDeleteImage: any;
};

const PageOne = (props: Proptypes) => {
  const {
    mainImage,
    setMainImage,
    handleOnChangeMainImage,
    images,
    stockCount,
    setStockCount,
    handleOnChangeImages,
    setFirstPage,
    handleDeleteImage,
  } = props;
  return (
    <div>
      {/* Product Information */}
      <InputGroup title="Product Information">
        <Input
          label="Product Name"
          name="productName"
          placeholder="Input product name"
          type="text"
        />
        <Input
          label="Price"
          name="price"
          placeholder="Input product price"
          type="number"
        />
        <Select
          label="Product Category"
          name="category"
          options={[
            { label: "Men's shoes", value: "Men's shoes" },
            { label: "Women's shoes", value: "Women's shoes" },
            { label: "Kids shoes", value: "Kids shoes" },
            { label: "Accessories", value: "Accessories" },
            { label: "Others", value: "Others" },
          ]}
        />
        <Select
          label="Status"
          name="status"
          options={[
            { label: "Release", value: "true" },
            { label: "Draft", value: "false" },
          ]}
        />
      </InputGroup>

      {/* Product Image */}
      <InputGroup title="Product Image">
        {/* Main Image */}
        <div>
          <p className="mb-1 font-semibold text-md text-neutral-700">
            Main Image
          </p>
          <div className="flex items-center gap-2 mb-2">
            {mainImage ? (
              <div
                className="relative w-1/4 h-24"
                onClick={() => setMainImage(null)}
              >
                <div className="top-0 right-0 absolute cursor-pointer">
                  <i className="top-0 right-0 absolute text-xl bx bx-x" />
                </div>
                <Image
                  src={URL.createObjectURL(mainImage)}
                  alt="main-image"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center bg-neutral-200 mb-2 p-1 border border-neutral-400 border-dashed w-1/4 h-24">
                <i className="text-2xl bx bx-image" />
                <p className="text-xs text-center">Upload a main image</p>
              </div>
            )}

            <InputFile
              label={"Upload Main Image Here"}
              name="mainImage"
              onChange={handleOnChangeMainImage}
            />
          </div>
        </div>

        {/* Rest Images */}
        <div>
          <p className="mb-1 font-semibold text-md text-neutral-700">
            Other Images
          </p>
          {images.length > 0 ? (
            <div className="gap-2 grid grid-cols-5">
              {images.map((item: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="relative mb-2 w-full h-24 overflow-hidden"
                  >
                    <div
                      className="top-0 right-0 absolute cursor-pointer"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <i className="top-0 right-0 absolute text-xl bx bx-x" />
                    </div>
                    <Image
                      src={URL.createObjectURL(item)}
                      alt={`image-${index.toString()}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center bg-neutral-200 mb-2 p-1 border border-neutral-400 border-dashed w-full h-full">
              <i className="text-2xl bx bx-image" />
              <p className="text-xs text-center">Upload product images</p>
            </div>
          )}

          <InputFile
            label={
              "Upload a product image. Larger image will be resized automatically"
            }
            name="image"
            onChange={handleOnChangeImages}
          />
        </div>
      </InputGroup>

      {/* Product Stock */}
      <InputGroup title="Product Stock">
        <p className="font-semibold text-md text-neutral-700">Product Stock</p>
        <div className="bg-neutral-200 mt-1 mb-3 w-full h-[1px]" />
        {stockCount.map((item: any, index: number) => (
          <div key={index} className="gap-3 grid grid-cols-2">
            <Input
              label="Size"
              name="size"
              placeholder="Input size"
              type="text"
              onChange={(e: any) => {
                const newStock = [...stockCount];
                newStock[index].size = e.target.value;
                setStockCount(newStock);
              }}
            />
            <Input
              label="Quantity"
              name="qty"
              placeholder="Input quantity"
              type="number"
              onChange={(e: any) => {
                const newStock = [...stockCount];
                newStock[index].qty = e.target.value;
                setStockCount(newStock);
              }}
            />
          </div>
        ))}
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={() => setStockCount([...stockCount, { size: "", qty: 0 }])}
          >
            <i className="bx bx-plus" />
          </Button>
        </div>
      </InputGroup>
      <Button
        type="button"
        classname="mt-4 w-full"
        onClick={() => setFirstPage(false)}
      >
        Next Page
        <i className="bx-chevrons-right text-xl bx" />
      </Button>
    </div>
  );
};

export default PageOne;

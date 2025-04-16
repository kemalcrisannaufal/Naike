/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import InputFile from "@/components/ui/InputFile";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select";
import { Product } from "@/types/product.type";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

type Proptypes = {
  productInfo: Product;
  setProductInfo: Dispatch<SetStateAction<Product>>;
  setFirstPage: Dispatch<SetStateAction<boolean>>;
  mainImage: File | null;
  setMainImage: Dispatch<SetStateAction<File | null>>;
  images?: File[];
  setImages?: Dispatch<SetStateAction<File[]>>;
  deletedImages?: string[];
  setDeletedImages?: Dispatch<SetStateAction<string[]>>;
  type?: "create" | "update";
};

const ProductFormFirstSection = (props: Proptypes) => {
  const {
    setProductInfo,
    productInfo,
    setFirstPage,
    mainImage,
    setMainImage,
    images,
    setImages,
    deletedImages,
    setDeletedImages,
    type = "create",
  } = props;

  const hasDefaultImage = productInfo.mainImage !== "";
  const [isMainImageUpdated, setIsMainImageUpdated] = useState(false);

  const handleOnChangeMainImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      setIsMainImageUpdated(true);
    }
  };

  const handleOnChangeImages = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "create") {
        setImages!([...images!, file]);
      } else {
        setProductInfo({
          ...productInfo,
          images: [...productInfo.images, file],
        });
      }
    }
  };

  const handleDeleteImage = (index: number) => {
    if (type === "create") {
      const newImages = [...images!];
      newImages.splice(index, 1);
      setImages!(newImages);
    } else {
      const newImages = [...productInfo.images];
      newImages.splice(index, 1);
      setDeletedImages!([...deletedImages!, productInfo.images[index]]);
      setProductInfo({ ...productInfo, images: newImages });
    }
  };

  return (
    <div>
      {/* Product Information */}
      <InputGroup title="Product Information">
        <Input
          label="Product Name"
          name="productName"
          placeholder="Input product name"
          type="text"
          onChange={(e: any) =>
            setProductInfo({ ...productInfo, name: e.target.value })
          }
          defaultValue={productInfo.name}
        />
        <Input
          label="Price"
          name="price"
          placeholder="Input product price"
          type="number"
          onChange={(e: any) =>
            setProductInfo({ ...productInfo, price: e.target.value })
          }
          defaultValue={productInfo.price}
        />
        <Select
          label="Product Category"
          name="category"
          options={[
            { label: "Men's shoes", value: "Men's shoes" },
            { label: "Women's shoes", value: "Women's shoes" },
          ]}
          onChange={(e: any) =>
            setProductInfo({ ...productInfo, category: e.target.value })
          }
          defaultValue={productInfo.category}
        />
        <Select
          label="Status"
          name="status"
          variant="normal"
          defaultValue={productInfo.status ? "release" : "draft"}
          options={[
            { label: "Release", value: "true" },
            { label: "Draft", value: "false" },
          ]}
          onChange={(e: any) =>
            setProductInfo({ ...productInfo, status: e.target.value })
          }
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
            {hasDefaultImage || isMainImageUpdated ? (
              <div
                className="relative w-1/4 h-24"
                onClick={() => setMainImage(null)}
              >
                <div className="top-0 right-0 absolute cursor-pointer">
                  <i className="top-0 right-0 absolute text-xl bx bx-x" />
                </div>
                <Image
                  src={
                    isMainImageUpdated
                      ? mainImage
                        ? URL.createObjectURL(mainImage)
                        : ""
                      : productInfo.mainImage
                  }
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
          {type === "create" && productInfo.images && images!.length > 0 ? (
            <div className="gap-2 grid grid-cols-5">
              {images!.map((item: any, index: number) => {
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
                      src={item ? URL.createObjectURL(item) : ""}
                      alt={`image-${index.toString()}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          ) : type === "update" &&
            productInfo.images &&
            productInfo.images.length > 0 ? (
            <div className="gap-2 grid grid-cols-5">
              {productInfo.images.map((item: any, index: number) => {
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
                      src={
                        typeof item === "string"
                          ? item
                          : URL.createObjectURL(item)
                      }
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
        {productInfo.stock &&
          productInfo.stock.map(
            (item: { size: string; qty: number }, index: number) => (
              <div key={index} className="gap-3 grid grid-cols-2">
                <Input
                  label="Size"
                  name="size"
                  placeholder="Input size"
                  type="text"
                  onChange={(e: any) => {
                    const newStock = [...productInfo.stock];
                    newStock[index].size = e.target.value;
                    setProductInfo({ ...productInfo, stock: newStock });
                  }}
                  defaultValue={item.size}
                />
                <Input
                  label="Quantity"
                  name="qty"
                  placeholder="Input quantity"
                  type="number"
                  onChange={(e: any) => {
                    const newStock = [...productInfo.stock];
                    newStock[index].qty = e.target.value;
                    setProductInfo({ ...productInfo, stock: newStock });
                  }}
                  defaultValue={item.qty}
                />
              </div>
            )
          )}
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={() =>
              setProductInfo({
                ...productInfo,
                stock: [...productInfo.stock, { size: "", qty: 0 }],
              })
            }
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

export default ProductFormFirstSection;

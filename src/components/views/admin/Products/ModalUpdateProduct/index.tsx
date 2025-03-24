/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import InputFile from "@/components/ui/InputFile";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Title from "@/components/ui/Text/Title";
import { Product } from "@/types/product.type";
import productServices from "@/services/products";
import { deleteFile, uploadFile } from "@/lib/firebase/service";
import Image from "next/image";
import InputGroup from "@/components/ui/InputGroup";
import TextArea from "@/components/ui/TextArea";

type Proptypes = {
  session: any;
  updatedProduct: Product | any;
  setUpdatedProduct: Dispatch<SetStateAction<Product | object>>;
  setToaster: Dispatch<SetStateAction<object>>;
};

const ModalUpdateProduct = (props: Proptypes) => {
  const { session, setUpdatedProduct, updatedProduct, setToaster } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [deletedImages, setDeletedImages] = useState<any>([]);

  const [firstPage, setFirstPage] = useState(true);
  const [productInfo, setProductInfo] = useState(updatedProduct);

  const handleOnChangeMainImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
    }
  };

  const handleOnChangeImages = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setProductInfo({
        ...productInfo,
        images: [...productInfo.images, URL.createObjectURL(file)],
      });
    }
  };

  const handleDeleteImage = (index: number) => {
    setDeletedImages((prev: any) => [...prev, productInfo.images[index]]);
    const newImages = [...productInfo.images];
    newImages.splice(index, 1);
    setProductInfo({ ...productInfo, images: newImages });
  };

  const updateRestImages = async () => {
    const uploadedImageUrls: string[] = [];

    for (const img of productInfo.images) {
      if (img instanceof File) {
        const newName = `${Date.now()}-${img.name}`;
        await uploadFile(
          updatedProduct.id,
          img,
          newName,
          "products",
          (status: boolean, newImageUrl: string) => {
            if (status) uploadedImageUrls.push(newImageUrl);
          }
        );
      } else {
        uploadedImageUrls.push(img);
      }
    }

    for (const deleted of deletedImages) {
      const oldImage = deleted.split("%2F")[3].split("?")[0];
      await deleteFile(
        `/images/products/${updatedProduct.id}/${oldImage}`,
        () => {}
      );
    }

    return uploadedImageUrls;
  };

  const updateData = async (
    id: string,
    imageUrl?: string,
    updatedImages?: string[]
  ) => {
    const data: Product = {
      ...productInfo,
      mainImage: imageUrl ? imageUrl : updatedProduct.mainImage,
      images: updatedImages ? updatedImages : updatedProduct.images,
    };

    const result = await productServices.updateProduct(
      session.data.accessToken,
      updatedProduct.id,
      data
    );

    if (result.status === 200) {
      updatedProduct.name = data.name;
      updatedProduct.price = data.price;
      updatedProduct.category = data.category;
      updatedProduct.status = data.status;
      updatedProduct.stock = data.stock;
      updatedProduct.mainImage = data.mainImage;
      updatedProduct.images = data.images;
      setIsLoading(false);
      setUpdatedProduct({});
      setToaster({ variant: "success", message: "Data updated successfully!" });
    } else {
      setIsLoading(false);
      setToaster({
        variant: "error",
        message: "Failed to update data. Please try again.",
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedImages = await updateRestImages();

    if (mainImage) {
      const oldImage = updatedProduct.mainImage.split("%2F")[3].split("?")[0];
      await deleteFile(
        `/images/products/${updatedProduct.id}/${oldImage}`,
        async (status: boolean) => {
          if (status) {
            const newName = "main." + mainImage.name.split(".")[1];
            await uploadFile(
              updatedProduct.id,
              mainImage,
              newName,
              "products",
              async (status: boolean, newImageUrl: string) => {
                if (status) {
                  await updateData(
                    updatedProduct.id,
                    newImageUrl,
                    updatedImages
                  );
                } else {
                  setToaster({
                    variant: "error",
                    message: "Failed to update the image. Please try again.",
                  });
                  setIsLoading(false);
                }
              }
            );
          } else {
            setToaster({
              variant: "error",
              message: "Failed to delete the old image. Please try again.",
            });
            setIsLoading(false);
          }
        }
      );
    } else {
      await updateData(updatedProduct.id, undefined, updatedImages);
    }
  };

  return (
    <Modal onClose={() => setUpdatedProduct({})}>
      <Title variant="small">Add Product</Title>

      {firstPage ? (
        <div>
          {/* Product Information */}
          <InputGroup title="Product Information">
            <Input
              label="Product Name"
              name="productName"
              placeholder="Input product name"
              type="text"
              defaultValue={updatedProduct.name}
              onChange={(e: any) =>
                setProductInfo({ ...productInfo, name: e.target.value })
              }
            />
            <Input
              label="Price"
              name="price"
              placeholder="Input product price"
              type="number"
              defaultValue={updatedProduct.price}
              onChange={(e: any) =>
                setProductInfo({ ...productInfo, price: e.target.value })
              }
            />
            <Select
              label="Product Category"
              name="category"
              defaultValue={updatedProduct.category}
              options={[
                { label: "Men's shoes", value: "Men's shoes" },
                { label: "Women's shoes", value: "Women's shoes" },
                { label: "Kids shoes", value: "Kids shoes" },
                { label: "Accessories", value: "Accessories" },
                { label: "Others", value: "Others" },
              ]}
              onChange={(e: any) =>
                setProductInfo({ ...productInfo, category: e.target.value })
              }
            />
            <Select
              label="Status"
              name="status"
              defaultValue={updatedProduct.status ? "true" : "false"}
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
                <div
                  className="relative w-1/4 h-24"
                  onClick={() => setMainImage(null)}
                >
                  <div className="top-0 right-0 absolute cursor-pointer">
                    <i className="top-0 right-0 absolute text-xl bx bx-x" />
                  </div>
                  <Image
                    src={
                      mainImage
                        ? URL.createObjectURL(mainImage)
                        : updatedProduct.mainImage
                    }
                    alt="main-image"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>

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
              {productInfo.images.length > 0 ? (
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
                            item instanceof File
                              ? URL.createObjectURL(item)
                              : item
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
            <p className="font-semibold text-md text-neutral-700">
              Product Stock
            </p>
            <div className="bg-neutral-200 mt-1 mb-3 w-full h-[1px]" />
            {productInfo.stock.map(
              (item: { size: string; qty: number }, index: number) => (
                <div key={index} className="gap-3 grid grid-cols-2">
                  <Input
                    label="Size"
                    name="size"
                    placeholder="Input size"
                    type="text"
                    defaultValue={item.size}
                    onChange={(e: any) => {
                      const newStock = [...productInfo.stock];
                      newStock[index].size = e.target.value;
                      setProductInfo({ ...productInfo, stock: newStock });
                    }}
                  />
                  <Input
                    label="Quantity"
                    name="qty"
                    placeholder="Input quantity"
                    type="number"
                    defaultValue={item.qty}
                    onChange={(e: any) => {
                      const newStock = [...productInfo.stock];
                      newStock[index].qty = e.target.value;
                      setProductInfo({ ...productInfo, stock: newStock });
                    }}
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
      ) : (
        <form onSubmit={handleSubmit} className="mt-3">
          {/* Product Description */}
          <InputGroup title="Product Description">
            <TextArea
              label="Description"
              name="description"
              defaultValue={productInfo.description}
              onChange={(e: any) =>
                setProductInfo({ ...productInfo, description: e.target.value })
              }
            />
          </InputGroup>

          {/* Product Benefit */}
          <InputGroup title="Product Benefit">
            {productInfo.benefits.map((item: string, index: number) => (
              <div key={index}>
                <Input
                  label={`Benefit ${index + 1}`}
                  name="benefit"
                  placeholder="Input benefit"
                  type="text"
                  defaultValue={item}
                  onChange={(e: any) => {
                    const newBenefits = [...productInfo.benefits];
                    newBenefits[index] = e.target.value;
                    setProductInfo({ ...productInfo, benefits: newBenefits });
                  }}
                />
              </div>
            ))}
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={() => {
                  setProductInfo({
                    ...productInfo,
                    benefits: [...productInfo.benefits, ""],
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
              defaultValue={productInfo.colourShown}
              onChange={(e: any) =>
                setProductInfo({ ...productInfo, colourShown: e.target.value })
              }
            />
            <Input
              label="Style"
              name="productStyle"
              placeholder="Style"
              type="text"
              defaultValue={productInfo.style}
              onChange={(e: any) =>
                setProductInfo({ ...productInfo, style: e.target.value })
              }
            />
            <Input
              label="Country/Region of Origin"
              name="country"
              placeholder="Country/Region of Origin"
              type="text"
              defaultValue={productInfo.country}
              onChange={(e: any) =>
                setProductInfo({ ...productInfo, country: e.target.value })
              }
            />

            <p className="mt-6 mb-2 font-semibold text-md text-neutral-700">
              More Details
            </p>
            {productInfo.details.map((item: string, index: number) => (
              <div key={index}>
                <Input
                  label={`Detail ${index + 1}`}
                  name="detail"
                  placeholder="Input detail"
                  type="text"
                  defaultValue={item}
                  onChange={(e: any) => {
                    const newDetails = [...productInfo.details];
                    newDetails[index] = e.target.value;
                    setProductInfo({ ...productInfo, details: newDetails });
                  }}
                />
              </div>
            ))}
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={() => {
                  setProductInfo({
                    ...productInfo,
                    details: [...productInfo.details, ""],
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
      )}
    </Modal>
  );
};

export default ModalUpdateProduct;

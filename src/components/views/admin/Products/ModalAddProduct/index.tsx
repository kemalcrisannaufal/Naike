/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import InputFile from "@/components/ui/InputFile";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Title from "@/components/ui/Text/Title";
import productServices from "@/services/products";
import { uploadFile } from "@/lib/firebase/service";
import { Product } from "@/types/product.type";
import Image from "next/image";
import TextArea from "@/components/ui/TextArea";
import InputGroup from "@/components/ui/InputGroup";

type Proptypes = {
  session: any;
  setProducts: Dispatch<SetStateAction<Product[]>>;
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setToaster: Dispatch<SetStateAction<object>>;
};

const ModalAddProduct = (props: Proptypes) => {
  const { session, setProducts, setModalAddProduct, setToaster } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [firstPage, setFirstPage] = useState(true);

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: 0,
    category: "Men's shoes",
    status: true,
    description: "",
    benefits: [""],
    details: [""],
    colourShown: "",
    style: "",
    country: "",
    stock: [{ size: "", qty: 0 }],
  });

  const handleOnChangeMainImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
    }
  };
  const handleOnChangeImages = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImages([...images, file]);
    }
    images.map((image) => {
      console.log(image);
    });
  };

  const uploadImage = async (id: string) => {
    const mainImageName = "main." + mainImage!.name.split(".")[1];
    let mainImageUrl = "";

    await uploadFile(
      id,
      mainImage,
      mainImageName,
      "products",
      async (status: boolean, newImageUrl: string) => {
        if (status) {
          mainImageUrl = newImageUrl;
          const imagesUrl: string[] = await Promise.all(
            images.map((image, index) => {
              const newName =
                "product_" + index + "." + image.name.split(".")[1];
              return new Promise<string>((resolve, reject) => {
                uploadFile(
                  id,
                  image,
                  newName,
                  "products",
                  (status: boolean, newImageUrl: string) => {
                    if (status) {
                      resolve(newImageUrl);
                    } else {
                      reject("Upload failed");
                    }
                  }
                );
              });
            })
          );

          const result = await productServices.updateProduct(
            session.data.accessToken,
            id,
            {
              mainImage: mainImageUrl,
              images: imagesUrl,
            }
          );

          if (result.status === 200) {
            const { data } = await productServices.getAllProducts();
            setProducts(data.data);
            setIsLoading(false);
            setModalAddProduct(false);
            setToaster({
              variant: "success",
              message: "Data added successfully!",
            });
          } else {
            setIsLoading(false);
            setModalAddProduct(false);
            setToaster({
              variant: "error",
              message: "Failed to add data. Please try again.",
            });
          }
        } else {
          setToaster({
            variant: "error",
            message: "Failed to update the image. Please try again.",
          });
        }
      }
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      ...productInfo,
      mainImage: "",
      images: [],
    };
    console.log(data);

    if (mainImage) {
      const result = await productServices.addProduct(
        session.data.accessToken,
        data
      );

      if (result.status === 200) {
        uploadImage(result.data.data.id);
      } else {
        setIsLoading(false);
        setModalAddProduct(false);
        setToaster({
          variant: "error",
          message: "Failed to add data. Please try again.",
        });
      }
    } else {
      setIsLoading(false);
      setModalAddProduct(false);
      setToaster({
        variant: "error",
        message: "Please upload a main image.",
      });
    }
  };

  const handleDeleteImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <Modal onClose={() => setModalAddProduct(false)}>
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
              onChange={(e: any) =>
                setProductInfo({ ...productInfo, name: e.target.value })
              }
            />
            <Input
              label="Price"
              name="price"
              placeholder="Input product price"
              type="number"
              onChange={(e: any) =>
                setProductInfo({ ...productInfo, price: e.target.value })
              }
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
              onChange={(e: any) =>
                setProductInfo({ ...productInfo, category: e.target.value })
              }
            />
            <Select
              label="Status"
              name="status"
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
                  {images.map((item, index) => {
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
            <p className="font-semibold text-md text-neutral-700">
              Product Stock
            </p>
            <div className="bg-neutral-200 mt-1 mb-3 w-full h-[1px]" />
            {productInfo.stock.map((item, index) => (
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
                />
              </div>
            ))}
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
              onChange={(e: any) =>
                setProductInfo({ ...productInfo, description: e.target.value })
              }
            />
          </InputGroup>

          {/* Product Benefit */}
          <InputGroup title="Product Benefit">
            {productInfo.benefits.map((item, index) => (
              <div key={index}>
                <Input
                  label={`Benefit ${index + 1}`}
                  name="benefit"
                  placeholder="Input benefit"
                  type="text"
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
              onChange={(e: any) =>
                setProductInfo({ ...productInfo, colourShown: e.target.value })
              }
            />
            <Input
              label="Style"
              name="productStyle"
              placeholder="Style"
              type="text"
              onChange={(e: any) =>
                setProductInfo({ ...productInfo, style: e.target.value })
              }
            />
            <Input
              label="Country/Region of Origin"
              name="country"
              placeholder="Country/Region of Origin"
              type="text"
              onChange={(e: any) =>
                setProductInfo({ ...productInfo, country: e.target.value })
              }
            />

            <p className="mt-6 mb-2 font-semibold text-md text-neutral-700">
              More Details
            </p>
            {productInfo.details.map((item, index) => (
              <div key={index}>
                <Input
                  label={`Detail ${index + 1}`}
                  name="detail"
                  placeholder="Input detail"
                  type="text"
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

export default ModalAddProduct;

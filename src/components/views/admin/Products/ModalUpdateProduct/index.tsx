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
import { uploadFile } from "@/lib/firebase/service";
import Image from "next/image";

type Proptypes = {
  session: any;
  updatedProduct: Product | any;
  setUpdatedProduct: Dispatch<SetStateAction<Product | object>>;
  setToaster: Dispatch<SetStateAction<object>>;
};
const ModalUpdateProduct = (props: Proptypes) => {
  const { session, setUpdatedProduct, updatedProduct, setToaster } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState<{ size: string; qty: number }[]>(
    updatedProduct.stock
  );
  const [uploadedImage, setUploadedImage] = useState("");

  const updateData = async (id: string, form: any, imageUrl?: string) => {
    const data = {
      name: form.productName.value,
      price: form.price.value,
      category: form.category.value,
      status: form.status.value === "true" ? true : false,
      stock: stockCount,
      image: imageUrl ? imageUrl : updatedProduct.image,
    };

    const result = await productServices.updateProduct(
      session.data.accessToken,
      updatedProduct.id,
      data
    );

    if (result.status === 200) {
      updatedProduct.name = form.productName.value;
      updatedProduct.price = form.price.value;
      updatedProduct.category = form.category.value;
      updatedProduct.status = form.status.value;
      updatedProduct.stock = stockCount;
      updatedProduct.image = imageUrl ? imageUrl : updatedProduct.image;
      setIsLoading(false);
      setUpdatedProduct({});
      setToaster({
        variant: "success",
        message: "Data updated successfully!",
      });
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
    const form = e.target as HTMLFormElement;
    const file = form.image.files[0];
    if (file) {
      const newName = "main." + file.name.split(".")[1];
      await uploadFile(
        updatedProduct.id,
        file,
        newName,
        "products",
        async (status: boolean, newImageUrl: string) => {
          if (status) {
            await updateData(updatedProduct.id, form, newImageUrl);
          } else {
            setToaster({
              variant: "error",
              message: "Failed to update the image. Please try again.",
            });
          }
        }
      );
    } else {
      await updateData(updatedProduct.id, form);
    }
  };

  return (
    <Modal onClose={() => setUpdatedProduct({})}>
      <Title variant="small">Add Product</Title>
      <form onSubmit={handleSubmit} className="mt-3">
        <div>
          <p className="font-semibold text-md text-neutral-700">
            Product Information
          </p>
          <div className="bg-neutral-200 mt-1 mb-3 w-full h-[1px]" />
          <Input
            label="Product Name"
            name="productName"
            placeholder="Input product name"
            type="text"
            defaultValue={updatedProduct.name}
          />
          <Input
            label="Price"
            name="price"
            placeholder="Input product price"
            type="number"
            defaultValue={updatedProduct.price}
          />
          <Select
            label="Product Category"
            name="category"
            defaultValue={updatedProduct.category}
            options={[
              { label: "Men", value: "men" },
              { label: "Women", value: "women" },
            ]}
          />
          <Select
            label="Status"
            name="status"
            defaultValue={updatedProduct.status ? "true" : "false"}
            options={[
              { label: "Release", value: "true" },
              { label: "Draft", value: "false" },
            ]}
          />
        </div>

        <div className="mt-6">
          <p className="font-semibold text-md text-neutral-700">
            Product Stock
          </p>
          <div className="bg-neutral-200 mt-1 mb-3 w-full h-[1px]" />
          {stockCount.map((item, index) => (
            <div key={index} className="gap-3 grid grid-cols-2">
              <Input
                label="Size"
                name="size"
                placeholder="Input size"
                type="text"
                defaultValue={item.size}
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
                defaultValue={item.qty}
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
              onClick={() =>
                setStockCount([...stockCount, { size: "", qty: 0 }])
              }
            >
              <i className="bx bx-plus" />
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <p className="font-semibold text-md text-neutral-700">
            Product Image
          </p>
          <div className="bg-neutral-200 mt-1 mb-3 w-full h-[1px]" />
          <div className="flex items-center gap-2">
            <div>
              <Image
                src={uploadedImage ? uploadedImage : updatedProduct.image}
                alt={updatedProduct.name}
                width={150}
                height={150}
              />
            </div>
            <InputFile
              label={
                "Upload a product image. Larger image will be resized automatically"
              }
              name="image"
              onChange={(e: any) => {
                const file = e.target.files[0];
                if (file) {
                  setUploadedImage(URL.createObjectURL(file));
                }
              }}
            />
          </div>
        </div>

        <Button type="submit" classname="mt-4 w-full">
          <i className="text-xl bx bx-save" />
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateProduct;

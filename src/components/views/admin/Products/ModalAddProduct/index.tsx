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

type Proptypes = {
  session: any;
  setProducts: Dispatch<SetStateAction<Product[]>>;
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setToaster: Dispatch<SetStateAction<object>>;
};
const ModalAddProduct = (props: Proptypes) => {
  const { session, setProducts, setModalAddProduct, setToaster } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState<{ size: string; qty: number }[]>(
    [{ size: "", qty: 0 }]
  );

  const uploadImage = async (id: string, form: any) => {
    const file = form.image.files[0];
    const newName = "main." + file.name.split(".")[1];
    if (file) {
      await uploadFile(
        id,
        file,
        newName,
        "products",
        async (status: boolean, newImageUrl: string) => {
          if (status) {
            const result = await productServices.updateProduct(
              session.data.accessToken,
              id,
              {
                image: newImageUrl,
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
          }
        }
      );
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target as HTMLFormElement;
    const data = {
      name: form.productName.value,
      price: form.price.value,
      category: form.category.value,
      status: form.status.value === "true" ? true : false,
      stock: stockCount,
      image: "",
    };

    const result = await productServices.addProduct(
      session.data.accessToken,
      data
    );

    if (result.status === 200) {
      uploadImage(result.data.data.id, form);
    } else {
      setIsLoading(false);
      setModalAddProduct(false);
      setToaster({
        variant: "error",
        message: "Failed to add data. Please try again.",
      });
    }
  };

  return (
    <Modal onClose={() => setModalAddProduct(false)}>
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
              { label: "Men", value: "men" },
              { label: "Women", value: "women" },
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
          <InputFile
            label="Upload a product image. Larger image will be resized automatically"
            name="image"
          />
        </div>

        <Button type="submit" classname="mt-4 w-full">
          <i className="text-xl bx bx-save" />
          {isLoading ? "Saving..." : "Save Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalAddProduct;

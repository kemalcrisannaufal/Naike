/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { Dispatch, SetStateAction, useContext } from "react";
import Title from "@/components/ui/Text/Title";
import { Product } from "@/types/product.type";
import productServices from "@/services/products";
import { deleteFile } from "@/lib/firebase/service";
import { ToasterContext } from "@/contexts/ToasterContext";

type Proptypes = {
  deletedProduct: Product | any;
  setDeletedProduct: Dispatch<SetStateAction<Product | object>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
};

const ModalDeleteProduct = (props: Proptypes) => {
  const { deletedProduct, setDeletedProduct, setProductsData } = props;
  const { setToaster } = useContext(ToasterContext);

  const handleDelete = async () => {
    try {
      const result = await productServices.deleteProduct(deletedProduct.id);

      if (result.status === 200) {
        const deleteImagesPromises = deletedProduct.images.map(
          (image: string) => {
            const filename = image.split("%2F")[3].split("?")[0];
            return new Promise<void>((resolve) => {
              deleteFile(
                `/images/products/${deletedProduct.id}/${filename}`,
                () => resolve()
              );
            });
          }
        );

        await Promise.all(deleteImagesPromises);

        const filename = deletedProduct.mainImage.split("%2F")[3].split("?")[0];
        deleteFile(
          `/images/products/${deletedProduct.id}/${filename}`,
          async (status: boolean) => {
            if (status) {
              setDeletedProduct({});
              const { data } = await productServices.getAllProducts();
              setProductsData(data.data);
              setToaster({
                variant: "success",
                message: "Data deleted successfully!",
              });
            }
          }
        );
      }
    } catch (error) {
      console.log(error);
      setToaster({
        variant: "error",
        message: "Failed to delete data. Please try again.",
      });
    }
  };

  return (
    <Modal onClose={() => setDeletedProduct({})}>
      <Title variant="small">Delete Product</Title>
      <p className="my-2 text-neutral-700">
        Are you sure want to delete this product?
      </p>

      <div className="bg-neutral-200 mb-2 p-4 rounded">
        <p className="mb-1 font-medium text-neutral-700">
          Product Name : {deletedProduct.name}
        </p>
        <p className="mb-1 font-medium text-neutral-700">
          Category : {deletedProduct.category}
        </p>
      </div>

      <div className="flex justify-end">
        <Button type="button" onClick={() => handleDelete()} classname="px-5">
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDeleteProduct;

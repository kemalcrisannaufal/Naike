/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import Title from "@/components/ui/Text/Title";
import { Product } from "@/types/product.type";
import productServices from "@/services/products";
import { deleteFile } from "@/lib/firebase/service";

type Proptypes = {
  deletedProduct: Product | any;
  setDeletedProduct: Dispatch<SetStateAction<Product | object>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  setToaster: Dispatch<SetStateAction<object>>;
};

const ModalDeleteProduct = (props: Proptypes) => {
  const { deletedProduct, setDeletedProduct, setProductsData, setToaster } =
    props;
  const session: any = useSession();

  const handleDelete = async () => {
    try {
      const result = await productServices.deleteProduct(
        session.data.accessToken,
        deletedProduct.id
      );

      if (result.status === 200) {
        const filename = deletedProduct.image.split("%2F")[3].split("?")[0];
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
      <Title variant="small">Delete User</Title>
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

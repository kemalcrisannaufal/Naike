/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "@/components/ui/Modal";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Title from "@/components/ui/Text/Title";
import { Product } from "@/types/product.type";
import productServices from "@/services/products";
import { deleteFile, uploadFile } from "@/lib/firebase/service";
import { ToasterContext } from "@/contexts/ToasterContext";
import ProductFormSecondSection from "../ProductForm/ProductFormSecondSection";
import ProductFormFirstSection from "../ProductForm/ProductFormFirstSection";

type Proptypes = {
  updatedProduct: Product | any;
  setUpdatedProduct: Dispatch<SetStateAction<Product | object>>;
};

const ModalUpdateProduct = (props: Proptypes) => {
  const { setUpdatedProduct, updatedProduct } = props;
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [deletedImages, setDeletedImages] = useState<any>([]);
  const [firstPage, setFirstPage] = useState(true);
  const [productInfo, setProductInfo] = useState(updatedProduct);

  const updateRestImages = async () => {
    const uploadPromises = productInfo.images.map(async (img: any) => {
      if (img instanceof File) {
        const newName = `${Date.now()}-${img.name}`;
        return new Promise<string>((resolve) => {
          uploadFile(
            updatedProduct.id,
            img,
            newName,
            "products",
            (status: boolean, newImageUrl: string) => {
              if (status) resolve(newImageUrl);
              else resolve("");
            }
          );
        });
      } else {
        return img;
      }
    });

    const deletePromises = deletedImages.map((deleted: string) => {
      const oldImage = deleted.split("%2F")[3].split("?")[0];
      return new Promise<void>((resolve) => {
        deleteFile(`/images/products/${updatedProduct.id}/${oldImage}`, () => {
          resolve();
        });
      });
    });

    const [uploadedImageUrls] = await Promise.all([
      Promise.all(uploadPromises),
      Promise.all(deletePromises),
    ]);

    return uploadedImageUrls.filter(Boolean);
  };

  const updateData = async (
    id: string,
    imageUrl?: string,
    updatedImages?: string[]
  ) => {
    const data: Product = {
      ...productInfo,
      updated_at: new Date(),
      mainImage: imageUrl ? imageUrl : updatedProduct.mainImage,
      images: updatedImages ? updatedImages : updatedProduct.images,
    };

    const result = await productServices.updateProduct(updatedProduct.id, data);

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
        <ProductFormFirstSection
          productInfo={productInfo}
          setProductInfo={setProductInfo}
          setFirstPage={setFirstPage}
          mainImage={mainImage}
          setMainImage={setMainImage}
          deletedImages={deletedImages}
          setDeletedImages={setDeletedImages}
          type="update"
        />
      ) : (
        <ProductFormSecondSection
          handleSubmit={handleSubmit}
          setProductInfo={setProductInfo}
          productInfo={productInfo}
          setFirstPage={setFirstPage}
          isLoading={isLoading}
        />
      )}
    </Modal>
  );
};

export default ModalUpdateProduct;

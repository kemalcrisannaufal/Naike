/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "@/components/ui/Modal";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Title from "@/components/ui/Text/Title";
import productServices from "@/services/products";
import { uploadFile } from "@/lib/firebase/service";
import { Product } from "@/types/product.type";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";

type Proptypes = {
  session: any;
  setProducts: Dispatch<SetStateAction<Product[]>>;
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setToaster: Dispatch<SetStateAction<object>>;
};

const ModalProduct = (props: Proptypes) => {
  const { session, setProducts, setModalAddProduct, setToaster } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState<{ size: string; qty: number }[]>(
    [{ size: "", qty: 0 }]
  );
  const [benefits, setBenefits] = useState<string[]>([""]);
  const [details, setDetails] = useState<string[]>([""]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [firstPage, setFirstPage] = useState(true);

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

  const uploadImage = async (id: string, form: any) => {
    const mainImage = form.mainImage.files[0];
    const mainImageName = "main." + mainImage.name.split(".")[1];
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
    const form = e.target as HTMLFormElement;
    const data = {
      name: form.productName.value,
      price: form.price.value,
      category: form.category.value,
      status: form.status.value === "true" ? true : false,
      stock: stockCount,
      mainImage: "",
      images: [],
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

  const handleDeleteImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const onChangeBenefit = (e: any) => {
    const value = e.target.value;
    setBenefits([...benefits, value]);
  };

  const onChangeDetail = (e: any) => {
    const value = e.target.value;
    setDetails([...details, value]);
  };

  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      <Title variant="small">Add Product</Title>

      {firstPage ? (
        <PageOne
          images={images}
          handleDeleteImage={handleDeleteImage}
          handleOnChangeImages={handleOnChangeImages}
          handleOnChangeMainImage={handleOnChangeMainImage}
          mainImage={mainImage}
          stockCount={stockCount}
          setStockCount={setStockCount}
          setFirstPage={setFirstPage}
          setMainImage={setMainImage}
        />
      ) : (
        <PageTwo
          setFirstPage={setFirstPage}
          benefits={benefits}
          setBenefits={setBenefits}
          onChangeBenefit={onChangeBenefit}
          details={details}
          setDetails={setDetails}
          onChangeDetail={onChangeDetail}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
    </Modal>
  );
};

export default ModalProduct;

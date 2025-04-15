import Modal from "@/components/ui/Modal";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Title from "@/components/ui/Text/Title";
import productServices from "@/services/products";
import { uploadFile } from "@/lib/firebase/service";
import { Product } from "@/types/product.type";
import { ToasterContext } from "@/contexts/ToasterContext";
import ProductFormFirstSection from "../ProductForm/ProductFormFirstSection";
import ProductFormSecondSection from "../ProductForm/ProductFormSecondSection";

type Proptypes = {
  setProducts: Dispatch<SetStateAction<Product[]>>;
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
};

const ModalAddProduct = (props: Proptypes) => {
  const { setProducts, setModalAddProduct } = props;
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [firstPage, setFirstPage] = useState(true);

  const [productInfo, setProductInfo] = useState<Product>({
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
    mainImage: "",
    images: [],
  });

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

          const result = await productServices.updateProduct(id, {
            mainImage: mainImageUrl,
            images: imagesUrl,
          });

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

    const benefits = productInfo.benefits!.filter((item) => item !== "");
    const details = productInfo.details!.filter((item) => item !== "");

    productInfo.benefits = benefits;
    productInfo.details = details;

    const data = {
      ...productInfo,
      created_at: new Date(),
      updated_at: new Date(),
      mainImage: "",
      images: [],
    };

    if (mainImage) {
      const result = await productServices.addProduct(data);

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

  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      <Title variant="small">Add Product</Title>

      {firstPage ? (
        <ProductFormFirstSection
          productInfo={productInfo}
          setProductInfo={setProductInfo}
          setFirstPage={setFirstPage}
          mainImage={mainImage}
          setMainImage={setMainImage}
          images={images}
          setImages={setImages}
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

export default ModalAddProduct;

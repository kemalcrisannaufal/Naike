import { useRouter } from "next/router";
import ProductDetailView from "@/components/views/productDetail";
import { useEffect, useState } from "react";
import { Product } from "@/types/product.type";
import productServices from "@/services/products";

const ProductDetailPage = () => {
  const { id } = useRouter().query;
  const [product, setProduct] = useState<Product>({} as Product);

  useEffect(() => {
    const getProduct = async (id: string) => {
      const { data } = await productServices.getProduct(id);
      setProduct(data.data);
    };
    getProduct(id as string);
  }, [id]);

  return <>{product && <ProductDetailView product={product} />}</>;
};

export default ProductDetailPage;

import { useRouter } from "next/router";
import ProductDetailView from "@/components/views/productDetail";
import { useEffect, useState } from "react";
import { Product } from "@/types/product.type";
import productServices from "@/services/products";
import ProductDetailSkeleton from "@/components/views/productDetail/ProductDetailSekeleton";

const ProductDetailPage = () => {
  const { id } = useRouter().query;
  const [product, setProduct] = useState<Product>({} as Product);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProduct = async (id: string) => {
      setIsLoading(true);
      const { data } = await productServices.getProduct(id);
      setProduct(data.data);
      setIsLoading(false);
    };
    getProduct(id as string);
  }, [id]);

  return (
    <>
      {isLoading ? (
        <ProductDetailSkeleton />
      ) : (
        <ProductDetailView product={product} />
      )}
    </>
  );
};

export default ProductDetailPage;

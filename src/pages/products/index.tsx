import { useProduct } from "@/components/hooks/useProduct";
import ProductView from "@/components/views/products";
import Head from "next/head";

const ProductPage = () => {
  const { products, isLoading } = useProduct();

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <ProductView products={products} isLoading={isLoading} />
    </>
  );
};

export default ProductPage;

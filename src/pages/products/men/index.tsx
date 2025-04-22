import { useProduct } from "@/components/hooks/useProduct";
import ProductsByCategoryView from "@/components/views/Products/category";
import Head from "next/head";

const MenProductsPage = () => {
  const { isLoading, products } = useProduct(undefined, "Men's shoes");
  return (
    <>
      <Head>
        <title>Men&#39;s Products</title>
      </Head>
      <ProductsByCategoryView products={products} isLoading={isLoading} />
    </>
  );
};

export default MenProductsPage;

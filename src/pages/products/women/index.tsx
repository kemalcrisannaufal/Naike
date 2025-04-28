import { useProduct } from "@/components/hooks/useProduct";
import ProductsByCategoryView from "@/components/views/products/category";
import Head from "next/head";

const WomenProductsPage = () => {
  const { isLoading, products } = useProduct(undefined, "Women's shoes");

  return (
    <>
      <Head>
        <title>Women&#39;s Products</title>
      </Head>
      <ProductsByCategoryView
        products={products}
        isLoading={isLoading}
        category="Women's Products"
      />
    </>
  );
};

export default WomenProductsPage;

import ProductView from "@/components/views/products";
import productServices from "@/services/products";
import { Product } from "@/types/product.type";
import Head from "next/head";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await productServices.getAllProducts();
      setProducts(data.data);
    };
    getAllProducts();
  }, []);

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <ProductView products={products} />
    </>
  );
};

export default ProductPage;

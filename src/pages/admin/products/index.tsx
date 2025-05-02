import ProductsAdminView from "@/components/views/admin/Products";
import { useProduct } from "@/components/hooks/useProduct";
import Head from "next/head";

const AdminProductsPage = () => {
  const { products, setProducts } = useProduct();
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <ProductsAdminView products={products} setProducts={setProducts} />
    </>
  );
};

export default AdminProductsPage;

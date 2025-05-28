import ProductsAdminView from "@/components/views/admin/Products";
import { useProduct } from "@/components/hooks/useProduct";
import Head from "next/head";

const AdminProductsPage = () => {
  const { products, setProducts, isLoading } = useProduct();

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <ProductsAdminView
        products={products}
        setProducts={setProducts}
        isLoading={isLoading}
      />
    </>
  );
};

export default AdminProductsPage;

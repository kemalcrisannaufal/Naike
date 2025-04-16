import ProductsAdminView from "@/components/views/admin/Products";
import { useProduct } from "@/components/hooks/useProduct";

const AdminProductsPage = () => {
  const { products, setProducts } = useProduct();
  return (
    <>
      <ProductsAdminView products={products} setProducts={setProducts} />
    </>
  );
};

export default AdminProductsPage;

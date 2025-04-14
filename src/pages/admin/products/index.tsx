import ProductsAdminView from "@/components/views/admin/Products";
import productServices from "@/services/products";
import { useEffect, useState } from "react";
import { Product } from "@/types/product.type";

const AdminProductsPage = () => {
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
      <ProductsAdminView products={products} setProducts={setProducts} />
    </>
  );
};

export default AdminProductsPage;

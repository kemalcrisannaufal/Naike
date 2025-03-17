import ProductsAdminView from "@/components/views/admin/Products";
import productServices from "@/services/products";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Product } from "@/types/product.type";

type Proptypes = {
  setToaster: Dispatch<SetStateAction<object>>;
};

const AdminProductsPage = (props: Proptypes) => {
  const { setToaster } = props;
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
      <ProductsAdminView
        products={products}
        setProducts={setProducts}
        setToaster={setToaster}
      />
    </>
  );
};

export default AdminProductsPage;

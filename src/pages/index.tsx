import DashboardView from "@/components/views/Dashboard";
import productServices from "@/services/products";
import { Product } from "@/types/product.type";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  useEffect(() => {
    const getLatestProducts = async () => {
      const { data } = await productServices.getProductsByLimit(3);
      setLatestProducts(data.data);
    };
    getLatestProducts();
  }, []);
  return <DashboardView latestProducts={latestProducts} />;
};

export default DashboardPage;

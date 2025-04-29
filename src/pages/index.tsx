import DashboardView from "@/components/views/dashboard";
import productServices from "@/services/products";
import { Product } from "@/types/product.type";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  useEffect(() => {
    const getLatestProducts = async () => {
      const { data } = await productServices.getAllProducts();
      data.data.sort(
        (a: Product, b: Product) =>
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime()
      );
      data.data = data.data.slice(0, 3);
      setLatestProducts(data.data);
    };
    getLatestProducts();
  }, []);
  return <DashboardView latestProducts={latestProducts} />;
};

export default DashboardPage;

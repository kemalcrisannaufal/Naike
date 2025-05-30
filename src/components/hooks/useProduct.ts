import productServices from "@/services/products";
import { Product } from "@/types/product.type";
import { sortDataByDate } from "@/utils/sort";
import { useEffect, useState } from "react";

export const useProduct = (id?: string, category?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      if (id) {
        const { data } = await productServices.getProduct(id);
        setProduct(data.data);
      } else if (category) {
        const { data } = await productServices.getProductByCategory(category);
        setProducts(data.data);
      } else {
        const { data } = await productServices.getAllProducts();

        const sortedData = sortDataByDate(data.data, "created_at");
        setProducts(sortedData);
      }

      setIsLoading(false);
    };
    getProducts();
  }, [id, category]);

  return { products, setProducts, product, isLoading };
};

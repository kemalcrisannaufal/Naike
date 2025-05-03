import { Product } from "@/types/product.type";
import CardProduct from "./Card";
import CardSkeleton from "./Card/skeleton";
import Pagination from "@/components/ui/Pagination";
import { useEffect, useState } from "react";
import Title from "@/components/ui/Text/Title";
import TextFilter from "@/components/ui/Filter/TextFilter";

type Proptypes = {
  products: Product[];
  isLoading: boolean;
};

const ProductView = (props: Proptypes) => {
  const { products, isLoading } = props;
  const dataPerPage = 12;
  const [idxPage, setIdxPage] = useState<number>(0);
  const [showedProducts, setShowedProducts] = useState<Product[]>([]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchProduct, setSearchProduct] = useState<string>("");

  useEffect(() => {
    if (searchProduct !== "") {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchProduct.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
    setShowedProducts(
      filteredProducts.slice(
        idxPage * dataPerPage,
        idxPage * dataPerPage + dataPerPage
      )
    );
  }, [idxPage, filteredProducts, products, searchProduct]);
  return (
    <div className="md:p-10 py-5">
      <div className="md:flex mb-5 p-3 md:p-0">
        <Title>Products</Title>
        <div className="md:m-0 my-2" />
        <TextFilter setSearchText={setSearchProduct} />
      </div>
      {isLoading ? (
        <div className="gap-2 md:gap-4 lg:gap-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4">
          {Array(8)
            .fill(0)
            .map((_, index) => {
              return <CardSkeleton key={index} />;
            })}
        </div>
      ) : (
        <div className="gap-2 md:gap-4 lg:gap-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4">
          {showedProducts.map((product) => (
            <CardProduct product={product} key={product.id} />
          ))}
        </div>
      )}

      {products.length > dataPerPage && (
        <Pagination
          idxPage={idxPage}
          setIdxPage={setIdxPage}
          dataLength={filteredProducts.length}
          dataPerPage={dataPerPage}
        />
      )}
    </div>
  );
};

export default ProductView;

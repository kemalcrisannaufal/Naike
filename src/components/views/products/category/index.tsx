/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "@/types/product.type";
import CardProduct from "../Card";
import CardSkeleton from "../Card/skeleton";
import { useState } from "react";
import Title from "@/components/ui/Text/Title";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Filter from "@/components/fragments/Filter";

type Proptypes = {
  products: Product[];
  isLoading: boolean;
  category: string;
};

const priceFilter = [
  {
    id: 1,
    name: "< Rp 1.000.000",
    minValue: 0,
    maxValue: 1000000,
  },
  {
    id: 2,
    name: "Rp 1.000.000 - Rp 2.000.000",
    minValue: 1000000,
    maxValue: 2000000,
  },
  {
    id: 3,
    name: "Rp 2.000.000 - Rp 3.000.000",
    minValue: 2000000,
    maxValue: 3000000,
  },
  {
    id: 4,
    name: "> Rp 3.000.000 ",
    minValue: 3000000,
    maxValue: 100000000,
  },
];

const ProductsByCategoryView = (props: Proptypes) => {
  const { products, category, isLoading } = props;
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filterActive, setFilterActive] = useState<number[]>([]);
  const [filterModal, setFilterModal] = useState(false);
  const handleChangeFilter = (e: any) => {
    const filterId = e.target.value;
    let updatedFilters = [];

    if (filterActive.includes(filterId)) {
      updatedFilters = filterActive.filter((id) => id !== filterId);
    } else {
      updatedFilters = [...filterActive, filterId];
    }

    setFilterActive(updatedFilters);

    const matchedProducts = products.filter((product: Product) => {
      return updatedFilters.some((id) => {
        const filter = priceFilter[id];
        return (
          product.price >= filter.minValue && product.price <= filter.maxValue
        );
      });
    });

    if (updatedFilters.length === 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(matchedProducts);
    }
  };

  return (
    <div className="md:p-10 py-5">
      <div className="flex justify-between items-center mb-2 px-2 md:px-0 w-full">
        <Title>{category}</Title>
        <Button
          variant="secondary"
          classname="rounded-full block lg:hidden"
          onClick={() => setFilterModal(true)}
        >
          <div className="flex justify-center items-center gap-2">
            <i className="text-base bx bx-filter"></i>
            <p>Filter</p>
          </div>
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="hidden lg:block lg:w-1/6">
          <Filter
            title="Shope by Price"
            handleChangeFilter={handleChangeFilter}
            filterList={priceFilter}
            hideFilterItem={true}
          />
        </div>

        {filterActive.length > 0 && filteredProducts.length === 0 ? (
          <div className="flex justify-center items-center w-full h-[25vh]">
            <p className="font-medium text-xl md:text-2xl">No product found</p>
          </div>
        ) : (
          <div className="gap-2 md:gap-4 lg:gap-7 grid grid-cols-2 md:grid-cols-3 w-full lg:w-5/6">
            {isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, index) => {
                    return <CardSkeleton key={index} />;
                  })
              : filterActive.length === 0
              ? products.map((product: Product) => {
                  return <CardProduct key={product.id} product={product} />;
                })
              : filteredProducts.map((product: Product) => {
                  return <CardProduct key={product.id} product={product} />;
                })}
          </div>
        )}
      </div>

      {filterModal && (
        <Modal onClose={() => setFilterModal(false)}>
          <Filter
            title="Shope by Price"
            handleChangeFilter={handleChangeFilter}
            filterList={priceFilter}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProductsByCategoryView;

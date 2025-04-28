import { useRouter } from "next/router";
import ProductDetailView from "@/components/views/productDetail";
import ProductDetailSkeleton from "@/components/views/productDetail/ProductDetailSekeleton";
import PageNotFound from "../404";
import { useProduct } from "@/components/hooks/useProduct";
import { useCart } from "@/components/hooks/useCart";
import { useFavorite } from "@/components/hooks/useFavorite";

const ProductDetailPage = () => {
  const { id } = useRouter().query;
  const { product, isLoading } = useProduct(id as string, undefined);
  const { cart, setCart } = useCart();
  const { favorites, setFavorites } = useFavorite();

  return (
    <>
      {isLoading && !product ? (
        <ProductDetailSkeleton />
      ) : !isLoading && product ? (
        <ProductDetailView
          product={product}
          productId={id as string}
          cart={cart}
          setCart={setCart}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      ) : (
        !isLoading && <PageNotFound />
      )}
    </>
  );
};

export default ProductDetailPage;

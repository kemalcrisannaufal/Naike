import { useCart } from "@/components/hooks/useCart";
import { useFavorite } from "@/components/hooks/useFavorite";
import FavoriteView from "@/components/views/Favorite";
import Head from "next/head";

const FavoritePage = () => {
  const { favorites, productsFavorite, setFavorites, isLoading } =
    useFavorite();
  const { cart, setCart } = useCart();

  return (
    <>
      <Head>
        <title>Favorite</title>
      </Head>
      <FavoriteView
        favorites={favorites}
        products={productsFavorite}
        setFavorites={setFavorites}
        cart={cart}
        setCart={setCart}
        isLoading={isLoading}
      />
    </>
  );
};

export default FavoritePage;

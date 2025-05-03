import { useProduct } from "@/components/hooks/useProduct";
import DashboardView from "@/components/views/dashboard";
import Head from "next/head";

const DashboardPage = () => {
  const { products } = useProduct();

  return (
    <>
      <Head>
        <title>Naike</title>
      </Head>
      <DashboardView latestProducts={products.slice(0, 3)} />
    </>
  );
};

export default DashboardPage;

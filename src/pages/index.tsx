import DashboardView from "@/components/views/dashboard";

const DashboardPage = () => {
  const category = [
    {
      name: "Shoes",
      image: "/assets/images/dashboard/shoes.png",
      url: "/",
    },
    {
      name: "Watches",
      image: "/assets/images/dashboard/watch.jpg",
      url: "/",
    },
    {
      name: "Clothing",
      image: "/assets/images/dashboard/cloth.webp",
      url: "/",
    },
    {
      name: "Accessories",
      image: "/assets/images/8360368.jpg",
      url: "/",
    },
  ];
  return <DashboardView category={category} />;
};

export default DashboardPage;

import Sidebar from "@/components/fragments/Sidebar";

type Proptypes = {
  children: React.ReactNode;
};

const listItem = [
  {
    name: "Dashboard",
    url: "/admin",
    icon: "bx bxs-dashboard",
  },
  {
    name: "Products",
    url: "/admin/products",
    icon: "bx bxs-box",
  },
  {
    name: "Users",
    url: "/admin/users",
    icon: "bx bxs-group",
  },
];

const AdminLayout = (props: Proptypes) => {
  const { children } = props;
  return (
    <div className="flex lg:flex-row flex-col w-full h-screen">
      <Sidebar listItem={listItem} />
      <div className="p-5 lg:px-24 lg:pt-10 w-full">{children}</div>
    </div>
  );
};

export default AdminLayout;

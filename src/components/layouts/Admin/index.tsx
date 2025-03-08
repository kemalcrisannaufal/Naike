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
    <div className="w-full h-screen flex flex-col lg:flex-row">
      <Sidebar listItem={listItem} />
      <div className="w-full p-3 lg:px-10 lg:pt-8">{children}</div>
    </div>
  );
};

export default AdminLayout;

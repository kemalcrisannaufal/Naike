import Sidebar from "@/components/fragments/Sidebar";

type Proptypes = {
  children: React.ReactNode;
};

const AdminLayout = (props: Proptypes) => {
  const { children } = props;

  return (
    <div className="flex flex-col lg:grid grid-cols-[288px_1fr] w-full">
      <Sidebar />
      <div className="p-5 lg:p-10 w-full">{children}</div>
    </div>
  );
};

export default AdminLayout;

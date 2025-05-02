import { useOrder } from "@/components/hooks/useOrder";
import DashboardAdminView from "@/components/views/admin/Dashboard";

const AdminPage = () => {
  const { orders } = useOrder();
  console.log(orders, "orders");
  return (
    <>
      <DashboardAdminView />
    </>
  );
};

export default AdminPage;

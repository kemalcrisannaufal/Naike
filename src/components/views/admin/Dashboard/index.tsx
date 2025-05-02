import AdminLayout from "@/components/layouts/Admin";
import Title from "@/components/ui/Text/Title";
import StatsCard from "./StatsCard";
import { convertIDR } from "@/utils/currency";
import { usePayment } from "@/components/hooks/usePayment";
import { totalRevenue } from "@/utils/total";
import { useUser } from "@/components/hooks/useUser";
import { useOrder } from "@/components/hooks/useOrder";

const DashboardAdminView = () => {
  const { payments, isLoading: paymentLoading } = usePayment();
  const { users, isLoading: userLoading } = useUser();
  const { orders, isLoading: orderLoading } = useOrder();

  return (
    <>
      <AdminLayout>
        <Title>Dashboard</Title>
        <div className="gap-5 grid grid-cols-3 mt-5">
          <StatsCard
            icon="bx-dollar"
            title="Total Revenue"
            description="Revenue from completed payments"
            loading={paymentLoading}
            value={
              payments
                ? convertIDR(
                    Array.isArray(payments) ? totalRevenue(payments) : 0
                  )
                : 0
            }
          />

          <StatsCard
            icon="bx-shopping-bag"
            title="Total Order"
            description="Number of completed orders"
            loading={orderLoading}
            value={orders.length}
          />
          <StatsCard
            icon="bx-user"
            description="Total registered users"
            title="Total Customer"
            loading={userLoading}
            value={users.length}
          />
        </div>
      </AdminLayout>
    </>
  );
};

export default DashboardAdminView;

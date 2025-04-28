/* eslint-disable @typescript-eslint/no-explicit-any */
import Title from "@/components/ui/Text/Title";

type Proptypes = {
  orders: any;
  products: any;
};
const OrdersView = (props: Proptypes) => {
  const { orders, products } = props;
  console.log(products);
  console.log(orders);

  return (
    <div className="p-5 md:px-20 lg:px-48 lg:pt-12 lg:pb-10">
      <Title>Orders</Title>
      <div>
        {/* {orders.map((order: any) => {
          return (
            <div key={order.id}>
              {order.items.map((item: any, index: number) => {
                const product = products.find(
                  (item) => item.id === item.productId
                );
                return <div key={index}> {product.id}</div>;
              })}
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default OrdersView;

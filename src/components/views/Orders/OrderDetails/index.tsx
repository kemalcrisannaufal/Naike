import Modal from "@/components/ui/Modal";
import Title from "@/components/ui/Text/Title";
import { Order } from "@/types/orders.type";
import { Product } from "@/types/product.type";
import TransactionDetail from "./TransactionDetail";
import ProductDetail from "./ProductDetail";
import PaymentDetail from "./PaymentDetail";
import ShippingDetail from "./ShippingDetail";

type Proptypes = {
  onClose: () => void;
  order: Order;
  products: Product[];
};

const OrderDetails = (props: Proptypes) => {
  const { onClose, products, order } = props;

  return (
    <Modal onClose={onClose}>
      <Title>Order Details</Title>
      <TransactionDetail order={order} />
      <ProductDetail order={order} products={products} />
      <ShippingDetail order={order} />
      <PaymentDetail order={order} />
    </Modal>
  );
};

export default OrderDetails;

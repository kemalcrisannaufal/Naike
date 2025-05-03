import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Title from "@/components/ui/Text/Title";
import PaymentDetail from "@/components/views/Orders/OrderDetails/PaymentDetail";
import ProductDetail from "@/components/views/Orders/OrderDetails/ProductDetail";
import ShippingDetail from "@/components/views/Orders/OrderDetails/ShippingDetail";
import TransactionDetail from "@/components/views/Orders/OrderDetails/TransactionDetail";
import { ToasterContext } from "@/contexts/ToasterContext";
import orderServices from "@/services/orders";
import { Order } from "@/types/orders.type";
import { Product } from "@/types/product.type";
import { useContext } from "react";

type Proptypes = {
  order: Order;
  onClose: () => void;
  products: Product[];
};

const ProcessOrder = (props: Proptypes) => {
  const { onClose, order, products } = props;
  const { setToaster } = useContext(ToasterContext);
  const handleProcessOrder = async () => {
    const result = await orderServices.updateOrder(order.id, {
      status: "shipped",
    });
    if (result.status === 200) {
      order.status = "shipped";
      setToaster({
        type: "success",
        message: "Order processed successfully",
      });
      onClose();
    } else {
      setToaster({
        type: "error",
        message: "Failed to process order",
      });
    }
  };
  return (
    <Modal onClose={onClose}>
      <Title>Process Order</Title>
      {order.status === "paid" ? (
        <div>
          <TransactionDetail order={order} />
          <ProductDetail order={order} products={products} />
          <ShippingDetail order={order} />
          <PaymentDetail order={order} />
          <div className="flex justify-end mt-5">
            <Button onClick={handleProcessOrder}>Mark as Shipped</Button>
          </div>
        </div>
      ) : (
        <div>
          <p className="bg-neutral-200 mt-5 py-3 text-sm text-center">
            Order is already processed or not paid
          </p>
          <div className="flex justify-end mt-5">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ProcessOrder;

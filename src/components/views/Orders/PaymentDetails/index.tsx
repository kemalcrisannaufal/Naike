import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Title from "@/components/ui/Text/Title";
import { Order } from "@/types/orders.type";
import { Product } from "@/types/product.type";
import PaymentReceipt from "./PaymentReceipt";
import TransactionInformation from "./TransactionInformation";
import { Payment } from "@/types/payment.type";
import paymentServices from "@/services/payment";
import orderServices from "@/services/orders";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";

type Proptypes = {
  order: Order;
  onClose: () => void;
  // handlePayment: (order: Order) => void;
  products: Product[];
  setOrders: Dispatch<SetStateAction<Order[]>>;
};

const PaymentDetails = (props: Proptypes) => {
  const { order, onClose, products, setOrders } = props;
  const { setToaster } = useContext(ToasterContext);
  const [showPaymentReceipt, setShowPaymentReceipt] = useState(false);
  const handlePayment = async () => {
    const paymentData: Payment = {
      orderId: order.id,
      amount: order.subtotal + order.taxes,
      userId: "",
      status: "Paid",
      method: "Dummy Payment",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await paymentServices.createPayment(paymentData);

    if (result.status === 200) {
      const data = {
        status: "paid",
        updated_at: new Date(),
      };

      const result = await orderServices.updateOrder(order.id, data);

      if (result.status === 200) {
        const { data } = await orderServices.getOrders();
        setOrders(data.data);
        // setToaster({
        //   variant: "success",
        //   message: "Payment successfully updated!",
        // });
        setShowPaymentReceipt(true);
        // onClose();
      } else {
        setToaster({
          variant: "error",
          message: "Failed to update payment. Please try again later!",
        });
      }
    } else {
      setToaster({
        variant: "error",
        message: "Failed to process payment. Please try again later!",
      });
    }
  };
  return (
    <>
      {order.status === "pending" ? (
        <Modal onClose={onClose}>
          <Title>Payment</Title>
          <TransactionInformation order={order} products={products} />

          <div className="flex justify-end mt-5">
            <Button onClick={handlePayment}> Make Payment</Button>
          </div>
        </Modal>
      ) : (
        <div>
          <PaymentReceipt onClose={onClose} order={order} products={products} />
        </div>
      )}

      {showPaymentReceipt && (
        <PaymentReceipt onClose={onClose} order={order} products={products} />
      )}
    </>
  );
};

export default PaymentDetails;

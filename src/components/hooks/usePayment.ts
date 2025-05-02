import paymentServices from "@/services/payment";
import { Payment } from "@/types/payment.type";
import { useEffect, useState } from "react";

export const usePayment = () => {
  const [payments, setPayments] = useState<Payment>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPayment = async () => {
      setIsLoading(true);
      const { data } = await paymentServices.getAllPayments();
      if (data) {
        setPayments(data.data);
      }
      setIsLoading(false);
    };
    getPayment();
  }, []);

  return { payments, setPayments, isLoading };
};

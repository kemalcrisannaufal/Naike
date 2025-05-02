import { Payment } from "./../types/payment.type";
const totalRevenue = (payments: Payment[]) => {
  return payments.reduce((acc, payment) => {
    return acc + payment.amount;
  }, 0);
};

export { totalRevenue };

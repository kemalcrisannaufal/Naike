export type Payment = {
  id?: string;
  orderId: string;
  userId: string;
  amount: number;
  status: string;
  method: string;
  created_at: Date;
  updated_at: Date;
};

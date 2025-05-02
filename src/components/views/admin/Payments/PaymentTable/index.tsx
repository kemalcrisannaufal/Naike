import Button from "@/components/ui/Button";
import { Payment } from "@/types/payment.type";
import { convertIDR } from "@/utils/currency";
import { getDate, getTime } from "@/utils/date";
import { Dispatch, SetStateAction } from "react";
type Proptypes = {
  payments: Payment[];
  setShowDetail: Dispatch<SetStateAction<Payment | null>>;
  dataPerPage?: number;
  idxPage?: number;
};

const PaymentsTable = (props: Proptypes) => {
  const { payments, setShowDetail, dataPerPage = 0, idxPage = 0 } = props;
  const tableHeaderClass =
    "bg-neutral-100 px-4 py-4 border-neutral-300 border-b text-neutral-700 ";
  const tableCellClass = "px-4 py-2";
  return (
    <div className="bg-white w-full overflow-x-auto">
      <table className="w-full min-w-max table-auto">
        <thead>
          <tr>
            <th className={tableHeaderClass}>No</th>
            <th className={tableHeaderClass}>Payment Id</th>
            <th className={tableHeaderClass}>Order Id</th>
            <th className={tableHeaderClass}>Payment Date</th>
            <th className={tableHeaderClass}>Method</th>
            <th className={tableHeaderClass}>Total</th>
            <th className={tableHeaderClass}>Status</th>
            <th className={`${tableHeaderClass} text-center`}>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment: Payment, index: number) => {
            return (
              <tr key={payment.id}>
                <td className={tableCellClass}>
                  {idxPage * dataPerPage + index + 1}
                </td>
                <td className={tableCellClass}>
                  <p className="bg-green-200 p-2 border rounded-full w-max font-semibold text-green-800 text-xs">
                    #{payment.id && payment.id.toUpperCase()}
                  </p>
                </td>
                <td className={tableCellClass}>
                  <p className="bg-sky-200 p-2 border rounded-full w-max font-semibold text-sky-800 text-xs">
                    #{payment.orderId.toUpperCase()}
                  </p>
                </td>
                <td className={tableCellClass}>
                  <p className="mb-1 text-neutral-600 text-sm">
                    Date : {getDate(payment.created_at)}
                  </p>
                  <p className="mb-1 text-neutral-600 text-sm">
                    Time : {getTime(payment.created_at)}
                  </p>
                </td>
                <td className={tableCellClass}>{payment.method}</td>
                <td className={tableCellClass}>
                  <p className="font-semibold">{convertIDR(payment.amount)}</p>
                </td>
                <td className={tableCellClass}>
                  <p
                    className={`w-max px-2 py-1 rounded ${
                      payment.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : payment.status === "paid"
                        ? "bg-blue-200 text-blue-800"
                        : payment.status === "shipped"
                        ? "bg-purple-200 text-purple-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    <p className="font-semibold text-xs">
                      {payment.status.toUpperCase()}
                    </p>
                  </p>
                </td>
                <td className={`${tableCellClass} flex gap-2 justify-center`}>
                  <Button
                    type="button"
                    onClick={() => setShowDetail(payment)}
                    classname="bg-yellow-500 hover:bg-yellow-700"
                  >
                    <i className="text-lg bx bx-receipt" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsTable;

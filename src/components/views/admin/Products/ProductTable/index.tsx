import Button from "@/components/ui/Button";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import { Dispatch, Fragment, SetStateAction } from "react";

type Proptypes = {
  products: Product[];
  setUpdatedProduct: Dispatch<SetStateAction<Product | object>>;
  setDeletedProduct: Dispatch<SetStateAction<Product | object>>;
};

const ProductTable = (props: Proptypes) => {
  const { products, setUpdatedProduct, setDeletedProduct } = props;
  const tableHeaderClass =
    "bg-neutral-100 px-4 py-2 border-neutral-300 border-b text-neutral-700 text-center";
  const tableCellClass = "px-4 py-2 text-center";

  return (
    <div className="mt-5 border border-neutral-300 rounded-lg overflow-x-auto">
      <table className="bg-white w-full min-w-max border-collapse">
        {/* Table head */}
        <thead>
          <tr className="border-neutral-300 border-b font-semibold">
            <th className={tableHeaderClass} rowSpan={2}>
              No
            </th>
            <th className={tableHeaderClass} rowSpan={2}>
              Image
            </th>
            <th className={tableHeaderClass} rowSpan={2}>
              Name
            </th>
            <th className={tableHeaderClass} rowSpan={2}>
              Category
            </th>
            <th className={tableHeaderClass} rowSpan={2}>
              Price
            </th>
            <th className={tableHeaderClass} colSpan={2}>
              Stock
            </th>
            <th className={tableHeaderClass} rowSpan={2}>
              Action
            </th>
          </tr>
          <tr>
            <td
              className={`${tableCellClass} bg-neutral-100  border-neutral-300 border-b font-semibold`}
            >
              Size
            </td>
            <td
              className={`${tableCellClass} bg-neutral-100 border-neutral-300 border-b font-semibold`}
            >
              Qty
            </td>
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {products.map((product: Product, index: number) => {
            const productStockLength = product.stock.length;
            return (
              <Fragment key={product.id}>
                <tr className="border-neutral-300 border-t">
                  <td className={tableCellClass} rowSpan={productStockLength}>
                    {index + 1}
                  </td>
                  <td className={tableCellClass} rowSpan={productStockLength}>
                    <div className="w-32 h-32 overflow-hidden">
                      <Image
                        src={product.mainImage}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                  </td>

                  <td className={tableCellClass} rowSpan={productStockLength}>
                    {product.name}
                  </td>
                  <td className={tableCellClass} rowSpan={productStockLength}>
                    {product.category}
                  </td>
                  <td className={tableCellClass} rowSpan={productStockLength}>
                    {convertIDR(product.price)}
                  </td>
                  <td className="px-4 text-center">{product.stock[0].size}</td>
                  <td className="px-4 text-center">{product.stock[0].qty}</td>

                  {/* Action */}
                  <td
                    className={`${tableCellClass}`}
                    rowSpan={productStockLength}
                  >
                    <div className="flex justify-center items-center gap-2">
                      <Button
                        type="button"
                        classname="bg-yellow-500 hover:bg-yellow-600"
                        onClick={() => setUpdatedProduct(product)}
                      >
                        <i className="text-lg bx bxs-edit" />
                      </Button>

                      <Button
                        type="button"
                        classname="bg-red-500 hover:bg-red-800"
                        onClick={() => setDeletedProduct(product)}
                      >
                        <i className="text-lg bx bxs-trash" />
                      </Button>
                    </div>
                  </td>
                </tr>

                {product.stock.map(
                  (stock: { size: string; qty: number }, index: number) => {
                    if (index > 0) {
                      return (
                        <tr key={index} className="text-center">
                          <td>{stock.size}</td>
                          <td>{stock.qty}</td>
                        </tr>
                      );
                    }
                  }
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;

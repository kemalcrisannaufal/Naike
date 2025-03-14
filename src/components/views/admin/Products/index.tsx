/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminLayout from "@/components/layouts/Admin";
import Button from "@/components/ui/Button";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";

type Proptypes = {
  products: Product[];
};

const ProductAdminViews = (props: Proptypes) => {
  const { products } = props;
  return (
    <>
      <AdminLayout>
        <h1 className="text-3xl text-neutral-800 font-semibold">
          Product Management
        </h1>
        <div className="mt-5 overflow-x-auto border border-gray-300 rounded-lg p-1">
          <table className="w-full min-w-max border-collapse bg-white">
            <thead>
              <tr className="border-b border-gray-300 text-gray-900 font-semibold text-sm text-neutral-700">
                <th
                  className="px-4 py-2 text-center border-b border-neutral-300"
                  rowSpan={2}
                >
                  No
                </th>
                <th
                  className="px-4 py-2 text-center border-b border-neutral-300"
                  rowSpan={2}
                >
                  Image
                </th>
                <th
                  className="px-4 py-2 text-center border-b border-neutral-300"
                  rowSpan={2}
                >
                  Name
                </th>
                <th
                  className="px-4 py-2 text-center border-b border-neutral-300"
                  rowSpan={2}
                >
                  Category
                </th>
                <th
                  className="px-4 py-2 text-center border-b border-neutral-300"
                  rowSpan={2}
                >
                  Price
                </th>
                <th
                  className="px-4 py-2 text-center border-b border-neutral-300"
                  colSpan={2}
                >
                  Stock
                </th>
                <th
                  className="px-4 py-2 text-center border-b border-neutral-300"
                  rowSpan={2}
                >
                  Action
                </th>
              </tr>
              <tr>
                <td className="px-4 py-2 text-center border-b border-neutral-300">
                  Size
                </td>
                <td className="px-4 py-2 text-center border-b border-neutral-300">
                  Qty
                </td>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any, index: any) => {
                return (
                  <>
                    <tr key={product.id} className="text-center">
                      <td
                        className="px-4 py-2 text-center"
                        rowSpan={product.stock.length}
                      >
                        {index + 1}
                      </td>
                      <td className="px-4 py-2" rowSpan={product.stock.length}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={100}
                          height={100}
                        />
                      </td>
                      <td className="px-4 py-2" rowSpan={product.stock.length}>
                        {product.name}
                      </td>
                      <td className="px-4 py-2" rowSpan={product.stock.length}>
                        {product.category}
                      </td>
                      <td className="px-4 py-2" rowSpan={product.stock.length}>
                        {convertIDR(product.price)}
                      </td>
                      <td>40</td>
                      <td>5</td>
                      <td className="px-4 py-2" rowSpan={product.stock.length}>
                        <div className="w-full h-full flex justify-center items-center gap-2 ">
                          <Button
                            type="button"
                            classname="bg-yellow-500 hover:bg-yellow-600"
                          >
                            <i className="bx bxs-edit text-lg"></i>
                          </Button>

                          <Button
                            type="button"
                            classname="bg-red-500 hover:bg-red-800"
                          >
                            <i className="bx bxs-trash text-lg"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                    {product.stock.map((stock: any, index: any) => {
                      if (index > 0) {
                        return (
                          <tr key={stock.size} className="text-center">
                            <td>{stock.size}</td>
                            <td>{stock.qty}</td>
                          </tr>
                        );
                      }
                    })}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
};

export default ProductAdminViews;

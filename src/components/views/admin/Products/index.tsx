/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminLayout from "@/components/layouts/Admin";
import Button from "@/components/ui/Button";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import Title from "@/components/ui/Text/Title";
import ModalAddProduct from "./ModalAddProduct";
import { useSession } from "next-auth/react";
import ModalDeleteProduct from "./ModalDeleteProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";

type Proptypes = {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  setToaster: Dispatch<SetStateAction<object>>;
};

const ProductAdminViews = (props: Proptypes) => {
  const { products, setProducts, setToaster } = props;
  const session: any = useSession();

  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<Product | object>({});
  const [deletedProduct, setDeletedProduct] = useState({});

  return (
    <>
      <AdminLayout>
        <div className="flex md:flex-row flex-col md:justify-between md:items-center w-full">
          <Title>Product Management</Title>
          <Button
            type="button"
            variant="primary"
            onClick={() => setModalAddProduct(true)}
            classname="md:mt-0 mt-3 w-max justify-self-end"
          >
            <i className="bx bx-plus" />
            Add Product
          </Button>
        </div>
        <div className="mt-5 border border-gray-300 rounded-lg overflow-x-auto">
          <table className="bg-white w-full min-w-max border-collapse">
            <thead>
              <tr className="border-gray-300 border-b font-semibold">
                <th
                  className="bg-neutral-100 px-4 py-2 border-gray-300 border-b text-neutral-700 text-center"
                  rowSpan={2}
                >
                  No
                </th>
                <th
                  className="bg-neutral-100 px-4 py-2 border-gray-300 border-b text-neutral-700 text-center"
                  rowSpan={2}
                >
                  Image
                </th>
                <th
                  className="bg-neutral-100 px-4 py-2 border-gray-300 border-b text-neutral-700 text-center"
                  rowSpan={2}
                >
                  Name
                </th>
                <th
                  className="bg-neutral-100 px-4 py-2 border-gray-300 border-b text-neutral-700 text-center"
                  rowSpan={2}
                >
                  Category
                </th>
                <th
                  className="bg-neutral-100 px-4 py-2 border-gray-300 border-b text-neutral-700 text-center"
                  rowSpan={2}
                >
                  Price
                </th>
                <th
                  className="bg-neutral-100 px-4 py-2 border-gray-300 border-b text-neutral-700 text-center"
                  colSpan={2}
                >
                  Stock
                </th>
                <th
                  className="bg-neutral-100 px-4 py-2 border-gray-300 border-b text-neutral-700 text-center"
                  rowSpan={2}
                >
                  Action
                </th>
              </tr>
              <tr>
                <td className="bg-neutral-100 px-4 py-2 border-gray-300 border-b font-semibold text-neutral-700 text-sm text-center">
                  Size
                </td>
                <td className="bg-neutral-100 px-4 py-2 border-gray-300 border-b font-semibold text-neutral-700 text-sm text-center">
                  Qty
                </td>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any, index: any) => {
                return (
                  <>
                    <tr key={product.id} className="text-neutral-700">
                      <td
                        className="px-4 py-2 text-center"
                        rowSpan={product.stock.length}
                      >
                        {index + 1}
                      </td>
                      <td
                        className="px-4 py-2 text-center"
                        rowSpan={product.stock.length}
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={100}
                          height={100}
                        />
                      </td>
                      <td
                        className="px-4 py-2 text-center"
                        rowSpan={product.stock.length}
                      >
                        {product.name}
                      </td>
                      <td
                        className="px-4 py-2 text-center"
                        rowSpan={product.stock.length}
                      >
                        {product.category}
                      </td>
                      <td
                        className="px-4 py-2 text-center"
                        rowSpan={product.stock.length}
                      >
                        {convertIDR(product.price)}
                      </td>
                      <td className="px-4 text-center">
                        {product.stock[0].size}
                      </td>
                      <td className="px-4 text-center">
                        {product.stock[0].qty}
                      </td>
                      <td
                        className="px-4 py-2 text-center"
                        rowSpan={product.stock.length}
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
                    {product.stock.map((stock: any, index: any) => {
                      if (index > 0) {
                        return (
                          <tr key={index} className="text-center">
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
      {modalAddProduct && (
        <ModalAddProduct
          setModalAddProduct={setModalAddProduct}
          session={session}
          setProducts={setProducts}
          setToaster={setToaster}
        />
      )}

      {Object.keys(updatedProduct).length > 0 && (
        <ModalUpdateProduct
          session={session}
          updatedProduct={updatedProduct}
          setUpdatedProduct={setUpdatedProduct}
          setToaster={setToaster}
        />
      )}

      {deletedProduct && Object.keys(deletedProduct).length > 0 && (
        <ModalDeleteProduct
          deletedProduct={deletedProduct}
          setDeletedProduct={setDeletedProduct}
          setProductsData={setProducts}
          setToaster={setToaster}
        />
      )}
    </>
  );
};

export default ProductAdminViews;

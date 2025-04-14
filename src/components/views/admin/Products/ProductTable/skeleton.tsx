const ProductTableSkeleton = () => {
  const tableHeaderClass =
    "bg-neutral-100 px-4 py-2 border-neutral-300 border-b text-neutral-700 text-center";
  const tableCellClass = "px-4 py-2 text-center bg-neutral-100 animate-blink";
  const stockHeaderClass =
    "px-4 py-2 bg-neutral-100 border-neutral-300 border-b font-semibold text-center";

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
            <td className={stockHeaderClass}>Size</td>
            <td className={stockHeaderClass}>Qty</td>
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {Array.from({ length: 6 }).map((_, index) => (
            <tr className="border-neutral-300" key={index}>
              <td className={tableCellClass}></td>
              <td className={`${tableCellClass}`}>
                <div className="bg-neutral-200 mx-auto rounded w-32 h-32 animate-blink" />
              </td>
              <td className={tableCellClass}>
                <div className="bg-neutral-200 mx-auto rounded w-24 h-4 animate-blink" />
              </td>
              <td className={tableCellClass}>
                <div className="bg-neutral-200 mx-auto rounded w-20 h-4 animate-blink" />
              </td>
              <td className={tableCellClass}>
                <div className="bg-neutral-200 mx-auto rounded w-16 h-4 animate-blink" />
              </td>
              <td className={tableCellClass}>
                <div className="bg-neutral-200 mx-auto rounded w-12 h-4 animate-blink" />
              </td>
              <td className={tableCellClass}>
                <div className="bg-neutral-200 mx-auto rounded w-12 h-4 animate-blink" />
              </td>
              <td className={tableCellClass}>
                <div className="flex justify-center items-center gap-2">
                  <div className="bg-neutral-200 rounded w-8 h-8" />
                  <div className="bg-neutral-200 rounded w-8 h-8" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTableSkeleton;

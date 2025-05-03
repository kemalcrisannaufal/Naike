const UserTableSkeleton = () => {
  const tableHeaderClass =
    "bg-neutral-100 px-4 py-4 border-neutral-200 border-b text-neutral-700 text-center";
  const tableCellClass = "px-4 py-2 text-center";
  const skeletonRows = Array.from({ length: 5 });

  return (
    <div className="mt-5 border border-neutral-200 rounded-lg overflow-x-auto animate-pulse">
      <table className="bg-white w-full min-w-max border-collapse">
        {/* Table header */}
        <thead>
          <tr className="border-neutral-200 border-b font-semibold text-neutral-600 lg:text-md text-sm">
            <th className={tableHeaderClass}>No</th>
            <th className={tableHeaderClass}>Avatar</th>
            <th className={tableHeaderClass}>Fullname</th>
            <th className={tableHeaderClass}>Email</th>
            <th className={tableHeaderClass}>Phone</th>
            <th className={tableHeaderClass}>Role</th>
            <th className={tableHeaderClass}>Action</th>
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {skeletonRows.map((_, index) => (
            <tr
              key={index}
              className="hover:bg-neutral-100 border-neutral-200 border-b last:border-b-0 text-neutral-700"
            >
              <td className={tableCellClass}>
                <div className="bg-neutral-200 rounded w-6 h-4" />
              </td>
              <td className={`${tableCellClass} flex justify-center`}>
                <div className="bg-neutral-200 rounded-full w-24 h-24" />
              </td>
              <td className={tableCellClass}>
                <div className="bg-neutral-200 rounded w-24 h-4" />
              </td>
              <td className={tableCellClass}>
                <div className="bg-neutral-200 rounded w-32 h-4" />
              </td>
              <td className={tableCellClass}>
                <div className="bg-neutral-200 rounded w-24 h-4" />
              </td>
              <td className={tableCellClass}>
                <div className="bg-neutral-200 rounded w-16 h-4" />
              </td>
              <td
                className={`${tableCellClass} py-4 flex justify-center items-center gap-2`}
              >
                <div className="bg-neutral-200 rounded w-8 h-8" />
                <div className="bg-neutral-200 rounded w-8 h-8" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTableSkeleton;

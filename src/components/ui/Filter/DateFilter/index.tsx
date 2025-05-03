import { Dispatch, SetStateAction } from "react";

type Proptypes = {
  searchDate: string;
  setSearchDate: Dispatch<SetStateAction<string>>;
};
const DateFilter = (props: Proptypes) => {
  const { searchDate, setSearchDate } = props;
  return (
    <div className="flex items-center mb-4">
      <label htmlFor="date" className="mr-2 font-semibold text-md">
        Date
      </label>

      <input
        name="date"
        type="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        className="shadow-sm px-4 py-2 border border-gray-300 focus:border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search by date"
      />
    </div>
  );
};

export default DateFilter;

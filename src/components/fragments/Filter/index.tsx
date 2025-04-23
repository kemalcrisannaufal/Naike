/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";

type Proptypes = {
  handleChangeFilter: (e: any) => void;
  filterList: any;
  title: string;
  hideFilterItem?: boolean;
};

const Filter = (props: Proptypes) => {
  const {
    handleChangeFilter,
    filterList,
    title,
    hideFilterItem = false,
  } = props;
  const [filterOpen, setFilterOpen] = useState(!hideFilterItem);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center w-full">
        <h1 className="font-semibold text-md text-neutral-800 md:text-lg">
          {title}
        </h1>
        <button
          className={`text-xs lg:text-sm cursor-pointer hidden lg:block`}
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <i
            className={`bx text-3xl text-neutral-800 ${
              filterOpen ? "bx-chevron-up" : "bx-chevron-down"
            }`}
          ></i>
        </button>
      </div>
      <div className="bg-neutral-200 mb-1 w-full h-[1px]" />

      {filterOpen &&
        filterList.map((filter: any) => {
          return (
            <div key={filter.id}>
              <label htmlFor={`filter-${filter.id}`}>
                <input
                  id={`filter-${filter.id}`}
                  name={`price-filter`}
                  type="checkbox"
                  className="peer-checked mr-2"
                  value={filterList.indexOf(filter)}
                  onChange={(e: any) => handleChangeFilter(e)}
                />
                <span className="text-xs lg:text-sm">{filter.name}</span>
              </label>
            </div>
          );
        })}
    </div>
  );
};

export default Filter;

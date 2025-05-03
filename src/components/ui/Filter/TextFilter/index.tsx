const TextFilter = ({
  setSearchText,
}: {
  setSearchText: (e: string) => void;
}) => {
  return (
    <div className="flex justify-end w-full">
      <label className="relative w-full md:w-1/2 lg:w-1/3">
        <input
          type="text"
          className="p-2 pl-10 border-2 border-neutral-300 rounded-full w-full"
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <i className="top-2.5 left-2.5 absolute text-neutral-500 text-2xl bx bx-search" />
      </label>
    </div>
  );
};

export default TextFilter;

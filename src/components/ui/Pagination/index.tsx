import { Dispatch, SetStateAction } from "react";

type Proptypes = {
  idxPage: number;
  setIdxPage: Dispatch<SetStateAction<number>>;
  dataLength: number;
  dataPerPage: number;
};

const PaginationButton = ({
  onClick,
  children,
  classname,
}: {
  onClick: () => void;
  children: React.ReactNode;
  classname?: string;
}) => {
  return (
    <button
      className={`bg-neutral-100 border-white border-x  cursor-pointer select-none ${classname}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Pagination = (props: Proptypes) => {
  const { idxPage, setIdxPage, dataLength, dataPerPage } = props;
  return (
    <div className="flex justify-end mt-5 w-full">
      <PaginationButton onClick={() => idxPage > 0 && setIdxPage(idxPage - 1)}>
        <i className="bx-chevron-left p-2 text-xl bx" />
      </PaginationButton>

      {Array.from(
        {
          length:
            dataLength % dataPerPage > 0
              ? dataLength / dataPerPage + 1
              : dataLength / dataPerPage,
        },
        (_, index) => {
          return (
            <PaginationButton
              key={index}
              onClick={() => setIdxPage(index)}
              classname={`${
                index === idxPage ? "bg-neutral-300" : "bg-neutral-100"
              } `}
            >
              <p className="px-3 py-2">{index + 1}</p>
            </PaginationButton>
          );
        }
      )}

      <PaginationButton
        onClick={() =>
          idxPage < dataLength / dataPerPage - 1 && setIdxPage(idxPage + 1)
        }
      >
        <i className="bx-chevron-right p-2 text-xl bx" />
      </PaginationButton>
    </div>
  );
};

export default Pagination;

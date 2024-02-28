import NextIcon from "./Icons/NextIcon";
import PrevIcon from "./Icons/prevIcon";

type PaginationPrps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
};

const PaginationSlash = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationPrps) => {
  return (
    <div className="flex w-[320px] justify-between mx-auto m-[30px]">
      <button
        onClick={() => {
          onPageChange(currentPage - 1);
        }}
        disabled={currentPage === 0}
        className="flex justify-center items-center rounded-full w-[40px] h-[40px] border-[1px] border-solid border-gray"
      >
        <PrevIcon width="8px" color="#777" />
      </button>
      <div className="flex gap-[2px]">
        <span className="font-medium">{currentPage + 1}</span>
        <span>/</span>
        <span className="text-neutral-400 font-medium">{totalPages}</span>
      </div>
      <button
        onClick={() => {
          onPageChange(currentPage + 1);
        }}
        disabled={currentPage === Number(totalPages) - 1}
        className="flex justify-center items-center rounded-full w-[40px] h-[40px] border-[1px] border-solid border-gray"
      >
        <NextIcon width="8px" color="#777" />
      </button>
    </div>
  );
};

export default PaginationSlash;

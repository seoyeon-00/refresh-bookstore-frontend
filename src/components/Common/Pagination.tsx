import NextIcon from "./Icons/NextIcon";
import PrevIcon from "./Icons/prevIcon";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
};

const Pagination = ({
  totalPages,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}: PaginationProps) => {
  const pageRange = 10; // 표시할 페이지 범위
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages + 1, startPage + pageRange - 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <div className="flex gap-12 items-center">
      <button
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex justify-center items-center rounded-full w-[32px] h-[32px] border-[1px] border-solid border-gray"
      >
        <PrevIcon width="7px" color="#777" />
      </button>
      <div className="flex gap-4">
        {pages.map((page) => (
          <div
            key={page}
            className={
              page === currentPage + 1
                ? "text-white font-medium bg-point inline-block w-[25px] h-[25px] text-center rounded"
                : "text-neutral-600"
            }
          >
            <button
              onClick={() => {
                onPageChange(page - 1);
              }}
            >
              {page}
            </button>
          </div>
        ))}
      </div>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex justify-center items-center rounded-full w-[32px] h-[32px] border-[1px] border-solid border-gray"
      >
        <NextIcon width="7px" color="#777" />
      </button>
    </div>
  );
};

export default Pagination;

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
    <div className="flex gap-10">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >{`<`}</button>
      <div className="flex gap-4">
        {pages.map((page) => (
          <div
            key={page}
            className={
              page === currentPage
                ? "text-white bg-point inline-block w-[23px] h-[23px] text-center rounded-full"
                : ""
            }
          >
            <button
              onClick={() => {
                onPageChange(page);
              }}
            >
              {page}
            </button>
          </div>
        ))}
      </div>
      <button
        disabled={currentPage === totalPages + 1}
        onClick={() => onPageChange(currentPage + 1)}
      >{`>`}</button>
    </div>
  );
};

export default Pagination;

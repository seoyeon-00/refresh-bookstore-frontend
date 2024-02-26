import BookCatalogue from "./BookCatalogue";
import { bookDataType } from "@/types/bookDataType";
import { getProduct } from "@/api/product";

function ProductList({ data }: { data?: bookDataType[] }) {
  return (
    <div>
      <div> {!data && <p>데이터 로딩 중...</p>}</div>
      <div className="w-full h-auto flex flex-row flex-wrap justify-start gap-5 items-start">
        {Array.isArray(data) &&
          data.map((book, index) => {
            return (
              <div key={`bookItem-${index}`} className="animate-up">
                <BookCatalogue key={index} book={book} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = await getProduct({ page: 0, size: 10 });
  return {
    props: {
      data,
    },
  };
}

export default ProductList;

import { bookDataType } from "@/types/bookDataType";
import { getProduct2 } from "@/api/product";
import BookCatalogue from "./BookCatalogue";

type ProductListProps = {
  categories: any;
};

export default async function ProductList({ categories }: ProductListProps) {
  try {
    const data = await getProduct2({ page: 0, size: 10 });
    const product: bookDataType[] = data.products;

    console.log(categories);

    return (
      <div>
        <div> {!product && <p>데이터 로딩 중...</p>}</div>
        {product &&
          product.map((book, index) => (
            <div key={`bookItem-${index}`} className="animate-up">
              <BookCatalogue
                key={index}
                book={book}
                //category={Number(book.categoryId)}
                category={categories[Number(book.categoryId)]}
              />
            </div>
          ))}
      </div>
    );
  } catch (error: any) {
    return <div>Error fetching data: {error.message}</div>;
  }
}

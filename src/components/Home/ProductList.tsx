import { bookDataType } from "@/types/bookDataType";
import { getProduct2 } from "@/api/product";

export default async function ProductList() {
  try {
    const data = await getProduct2({ page: 0, size: 10 });
    const product: bookDataType[] = data.products;
    return (
      <div>
        <div> {!product && <p>데이터 로딩 중...</p>}</div>
        <h1>Your Data:</h1>
        {product &&
          product?.map((item) => <div key={item.id}>{item.title}</div>)}
      </div>
    );
  } catch (error: any) {
    return <div>Error fetching data: {error.message}</div>;
  }
}

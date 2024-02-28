import Categories from "@/components/Home/Categories";
import ProductList from "@/components/Home/ProductList";
import { bookDataType } from "@/types/bookDataType";
import { getProduct2 } from "@/api/product";
import { getCategory } from "@/api/category";
import ProductContainer2 from "@/components/Home/ProductContainer2";

const Test = async () => {
  const [category, data] = await Promise.all([
    getCategory({ page: 0, size: 20 }),
    getProduct2({ page: 0, size: 10 }),
  ]);

  return (
    <div>
      <div className="w-full p-4 border-b border-light_green flex flex-row justify-start flex-wrap my-5 gap-[5px]">
        <Categories />
      </div>
      <ProductContainer2 initialProduct={data} category={category} />
    </div>
  );
};

export default Test;

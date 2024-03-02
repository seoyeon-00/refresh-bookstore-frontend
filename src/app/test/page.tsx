import { getProduct2 } from "@/api/product";
import { getCategory } from "@/api/category";
import ProductContainer2 from "@/components/Home/ProductContainer2";
import Categories2 from "@/components/Home/Categories2";
import dynamic from "next/dynamic";
import { ClipLoader } from "react-spinners";

const Test = async () => {
  const [category, data] = await Promise.all([
    getCategory({ page: 0, size: 20 }),
    getProduct2({ page: 0, size: 10 }),
  ]);

  const Banner = dynamic(() => import("@/components/Home/Banner"), {
    loading: () => <ClipLoader />,
  });

  return (
    <div>
      <div className="w-full p-4 border-b border-light_green flex flex-row justify-start flex-wrap my-5 gap-[5px]">
        <Categories2 category={category} />
      </div>
      <ProductContainer2 initialProduct={data} category={category} />
      <Banner />
    </div>
  );
};

export default Test;

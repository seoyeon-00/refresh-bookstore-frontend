import { getCategory } from "@/api/category";

export async function getServerSideProps() {
  const res = await getCategory({ page: 0, size: 20 });

  const categoryStateData = res.map((item: any) => item.name);
  if (!categoryStateData.includes("전체")) {
    categoryStateData.unshift("전체");
  }

  return {
    props: { categoryStateData },
  };
}

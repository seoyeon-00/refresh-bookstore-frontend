import { categoryDataType } from "@/types/categoryDataType";

type CategoryItemProps = {
  item: categoryDataType;
};

const CategoryItem: React.FC<CategoryItemProps> = ({ item }) => {
  return (
    <div className="flex bg-point mb-2 py-3 px-5 rounded-full text-white text-sm">
      <div className="w-[8%]">{item.id}</div>
      <div className="font-semibold">{item.name}</div>
    </div>
  );
};

export default CategoryItem;

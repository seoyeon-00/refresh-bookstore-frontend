import { categoryDataType } from "@/types/categoryDataType";
import SettingIcon from "../Common/Icons/SettingIcon";
import MinusIcon from "../Common/Icons/MinusIcon";
import { useState } from "react";

type CategoryItemProps = {
  item: categoryDataType;
  deleteCategoryHandler: (id: number) => Promise<void>;
  updateCategoryHander: (data: categoryDataType) => Promise<void>;
};

const CategoryItem: React.FC<CategoryItemProps> = ({
  item,
  deleteCategoryHandler,
  updateCategoryHander,
}) => {
  const [isInput, setIsInput] = useState<boolean>(false);
  const [updateValue, setUpdateValue] = useState<string>("");

  const data = {
    id: item.id,
    name: updateValue,
  };

  return (
    <div className="flex bg-point mb-2 py-3 px-5 rounded-full text-white text-sm items-center">
      <div className="w-[8%]">{item.id}</div>
      <div className="w-[80%] font-semibold">
        {isInput ? (
          <div className="relative">
            <input
              className="w-[96%] px-2 py-1 text-xs font-normal text-black"
              placeholder="카테고리를 입력해주세요."
              onChange={(event) => setUpdateValue(event.target.value)}
              value={updateValue}
            />
            <button
              onClick={async () => {
                await updateCategoryHander(data);
                await setIsInput(false);
                await setUpdateValue("");
              }}
              className="text-xs absolute right-5 text-point top-1"
            >
              수정
            </button>
          </div>
        ) : (
          <div>{item.name}</div>
        )}
      </div>
      <div
        onClick={() => setIsInput(!isInput)}
        className="px-1 hover:-translate-y-[2px] hover:transition-transform transition-transform"
      >
        <SettingIcon color={"#e8e9e8"} width={"13px"} />
      </div>
      <div
        onClick={() => deleteCategoryHandler(item.id!)}
        className="px-1 hover:-translate-y-[2px] hover:transition-transform transition-transform"
      >
        <MinusIcon color={"#ffffff"} width={"13px"} />
      </div>
    </div>
  );
};

export default CategoryItem;

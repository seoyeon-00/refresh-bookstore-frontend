import { getCategory } from "@/api/category";
import { getProduct } from "@/api/product";
import { atom } from "recoil";

type StateProps = {
  categories: string[];
  currentCategory: string;
  allPage: number;
  //currentPage: number;
};

export const categoryState = atom<StateProps>({
  key: "categoryState",
  default: {
    categories: ["전체"],
    currentCategory: "전체",
    allPage: 1,
    //currentPage: 0,
  },
});

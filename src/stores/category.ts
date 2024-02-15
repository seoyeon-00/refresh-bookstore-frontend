import { atom } from "recoil";

type StateProps = {
  categories: string[];
  currentCategory: string;
  allPage: number;
};

export const categoryState = atom<StateProps>({
  key: "categoryState",
  default: {
    categories: ["전체"],
    currentCategory: "전체",
    allPage: 1,
  },
});

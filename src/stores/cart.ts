import { atom } from "recoil";
import { cartStateType } from "../types/cartStateType";

export const cartState = atom<cartStateType[]>({
  key: "cartState",
  default:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") ?? "[]")
      : [],
});

export const checkedCartState = atom<cartStateType[]>({
  key: "checkedCartState",
  default: [],
});

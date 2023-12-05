import { atom } from "recoil";

export const productPopupState = atom<boolean>({
  key: "productCodePopupState",
  default: false,
});

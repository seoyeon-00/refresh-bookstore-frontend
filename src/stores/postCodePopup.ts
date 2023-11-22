import { atom } from "recoil";

export const postCodePopupState = atom<boolean>({
  key: "postCodePopupState",
  default: false,
});

export const orderUpdatePopupState = atom<boolean>({
  key: "orderUpdatePopupState",
  default: false,
});

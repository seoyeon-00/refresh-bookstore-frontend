import { atom } from "recoil";

export const postCodePopupState = atom<boolean>({
  key: "postCodePopupState",
  default: false,
});

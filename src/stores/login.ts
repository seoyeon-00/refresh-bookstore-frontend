import { atom } from "recoil";

type StateProps = {
  isLogin: boolean | null;
};

export const loginState = atom<StateProps>({
  key: "loginState",
  default: {
    isLogin: null,
  },
});

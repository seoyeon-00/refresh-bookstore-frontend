import { bookDataType } from "./bookDataType";

export type cartStateType = bookDataType & {
  amount: number;
  id: string;
};

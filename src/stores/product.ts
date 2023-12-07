import { bookDataType } from "@/types/bookDataType";
import { atom } from "recoil";

type StateProps = {
  isOpen: boolean;
  update: boolean;
  item: bookDataType;
};

export const productPopupState = atom<StateProps>({
  key: "productCodePopupState",
  default: {
    isOpen: false,
    update: false,
    item: {
      categoryId: 1,
      title: "",
      author: "",
      publisher: "",
      publicationDate: "",
      isbn: "",
      description: "",
      price: 0,
      imagePath: "",
      isBestSeller: false,
    },
  },
});

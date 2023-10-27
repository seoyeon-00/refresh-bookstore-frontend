import { useRecoilState } from "recoil";
import { cartState } from "../stores/cart";
import { cartStateType } from "../types/cartStateType";

export default function useCart() {
  const [cart, setCart] = useRecoilState(cartState);
  const increaseAmount = (isbn: string) => {
    setCart(
      cart.filter((item: cartStateType) => {
        if (item.isbn === isbn) {
          item.amount += 1;
        }
      })
    );
  };

  const decreaseAmount = (isbn: string) => {
    setCart(
      cart.filter((item: cartStateType) => {
        if (item.isbn === isbn) {
          item.amount -= 1;
        }
      })
    );
  };

  const setAmount = (isbn: string, amount: number) => {
    setCart(
      cart.filter((item: cartStateType) => {
        if (item.isbn === isbn) {
          item.amount = amount;
        }
      })
    );
  };

  const deleteItem = (isbn: string) => {
    setCart(cart.filter((item: cartStateType) => item.isbn !== isbn));
  };

  return { cart, increaseAmount, decreaseAmount, setAmount, deleteItem };
}

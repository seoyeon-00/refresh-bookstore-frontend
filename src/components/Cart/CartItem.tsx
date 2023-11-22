import { ChangeEvent, ForwardedRef, forwardRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { cartStore } from "../../stores";
import { cartStateType } from "../../types/cartStateType";

type cartItemProps = {
  isbn: string;
  image_path: string;
  title: string;
  author: string;
  price: number;
  amount: number;
};

const CartItem = (
  { isbn, image_path, title, author, price, amount }: cartItemProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [cart, setCart] = useRecoilState(cartStore.cartState);
  const index = cart.findIndex((item: cartStateType) => item.isbn === isbn);

  const replaceItemAtIndex = (
    arr: cartStateType[],
    index: number,
    newValue: cartStateType
  ) => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  };

  const setAmount = (amount: number) => {
    const newCart = replaceItemAtIndex(cart, index, {
      ...cart[index],
      amount: amount,
    });
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const amountChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const deleteItemAtIndex = (arr: cartStateType[], index: number) => {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  };

  const deleteItem = () => {
    const newCart = deleteItemAtIndex(cart, index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <>
      <input
        className="cart-item__checkbox cursor-pointer w-[16px] h-[16px]"
        type="checkbox"
        name="select-item"
        ref={ref}
        defaultChecked
      />
      <div className="w-[10%] h-auto p-1 mx-2 flex items-center border-[1px] border-light_gray">
        <img src={image_path} alt={title} />
      </div>
      <div className="flex flex-col justify-center w-1/2">
        <h1 className="text-base font-normal leading-tight">{title}</h1>
        <div className="text-xs text-dark_gray mt-3">{author}</div>
      </div>
      <div className="flex flex-col items-center mb-1">
        <p className="text-dark_gray text-small ">수량</p>
        <input
          type="number"
          className="border-[1px] border-gray rounded pl-3 w-[50px] text-center cursor-pointer"
          min={1}
          value={amount}
          onChange={amountChangeHandler}
        />
      </div>
      <div className="w-[150px] flex flex-col justify-center items-center">
        <p className="text-[13px] text-dark_gray">상품 금액</p>
        <p className="text-[17px] font-medium">
          {(price * amount).toLocaleString()}원
        </p>
      </div>
      <input
        type="button"
        value="삭제"
        onClick={deleteItem}
        className="py-1 px-2 rounded-sm text-small font-medium bg-point text-white cursor-pointer duration-500 hover:-translate-y-1"
      />
    </>
  );
};

export default forwardRef(CartItem);

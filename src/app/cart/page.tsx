"use client";

import { cartStateType } from "../../types/cartStateType";
import CartItem from "../../components/Cart/CartItem";
import { useRecoilState } from "recoil";
import { cartStore } from "../../stores";
import { createRef, SyntheticEvent, useEffect, useRef, useState } from "react";
import { checkedCartState } from "../../stores/cart";
import ErrorIcon from "../../components/Common/Icons/ErrorIcon";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [cart, setCart] = useRecoilState(cartStore.cartState);
  const [checkedItemPrice, setCheckedItemPrice] = useState(0);

  const [checkedCartData, setCheckedCartData] =
    useRecoilState(checkedCartState);
  const formRef = useRef<HTMLFormElement>(null);
  const checkboxRefs = cart.map(() => createRef<HTMLInputElement>());
  const [formData, setFormData] = useState<FormData>();

  const setAllCheckedFromItems = () => {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const selectedCount = data.getAll("select-item").length;
    const allChecked = selectedCount === cart.length;
    formRef.current.querySelector<HTMLInputElement>(".select-all")!.checked =
      allChecked;
  };

  const setItemsCheckedFromAll = (targetInput: HTMLInputElement) => {
    const allChecked = targetInput.checked;
    checkboxRefs
      .filter((inputElem) => {
        return !inputElem.current!.disabled;
      })
      .forEach((inputElem) => {
        inputElem.current!.checked = allChecked;
      });
  };

  const handleCheckboxChanged = (e?: SyntheticEvent) => {
    if (!formRef.current) return;
    const targetInput = e?.target as HTMLInputElement;
    if (targetInput && targetInput.classList.contains("select-all")) {
      setItemsCheckedFromAll(targetInput);
    } else {
      setAllCheckedFromItems();
    }
    const data = new FormData(formRef.current);
    setFormData(data);
  };

  const deleteCheckedItem = () => {
    const unCheckedItems: cartStateType[] = checkboxRefs.reduce<
      cartStateType[]
    >((res, ref, i) => {
      if (!ref.current?.checked) res.push(cart[i]);
      return res;
    }, []);
    setCart(unCheckedItems);
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(unCheckedItems));
    }
  };

  const purchase = async () => {
    const token = localStorage.getItem("token");

    if (token !== null) {
      try {
        const response = await fetch(`/api/user/info`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${JSON.parse(token).value}`,
          },
        });
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          router.push("/order-create");
        } else {
          throw new Error("error");
        }
      } catch (err: any) {
        console.log(err.message);
        alert("로그인을 해주세요.");
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    setIsClient(true);
    const checkedPriceArr = cart.map((item) => item.amount * item.price);
    const checkedPrice = checkedPriceArr.reduce((a, b) => a + b, 0);
    setCheckedItemPrice(checkedPrice);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, []);

  // cart와 formData, 체크박스의 상태가 바뀌면 가격 변경 출력
  useEffect(() => {
    const checkedItems = checkboxRefs.reduce<cartStateType[]>((res, ref, i) => {
      if (ref.current?.checked) res.push(cart[i]);
      return res;
    }, []);

    const checkedPriceArr = checkedItems.map(
      (item) => item.amount * item.price
    );
    const checkedPrice = checkedPriceArr.reduce((a, b) => a + b, 0);
    setCheckedItemPrice(checkedPrice);
  }, [cart, formData, checkboxRefs]);

  if (!isClient) return null;
  return (
    <div className="m-8">
      <h1 className="text-large my-1">장바구니</h1>
      <hr className="text-light_gray" />
      {cart.length ? (
        <>
          <form ref={formRef} onChange={handleCheckboxChanged}>
            <section className="my-3 flex justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="select-all mx-2 cursor-pointer w-[16px] h-[16px]"
                  name="select-all"
                  defaultChecked
                />
                전체선택
              </label>
              <input
                type="button"
                className="bg-[#898989] text-xs text-[#e8e8e8] font-medium rounded px-2 py-1 cursor-pointer"
                value="선택 삭제"
                onClick={deleteCheckedItem}
              />
            </section>
            <div className="bg-[#f9f9f9] py-3 px-5">
              {cart.map((book: cartStateType, i) => (
                <div
                  key={book.isbn}
                  className="bg-white border-[1px] border-light_gray rounded-lg w-full h-[150px] my-3 px-5 py-1 flex justify-between items-center shadow-md"
                >
                  <CartItem
                    isbn={book.isbn}
                    image_path={book.imagePath}
                    title={book.title}
                    author={book.author}
                    price={book.price}
                    amount={book.amount}
                    ref={checkboxRefs[i]}
                  />
                </div>
              ))}
            </div>
          </form>
          <hr className="text-light_gray" />
          <section className="cartInfo flex justify-between mt-2">
            <p className="text-dark_gray m-2 text-sm">
              * 기본배송비 3,000원 | 50,000원 이상 구매시 무료 배송
            </p>
            <div className="priceInfo w-[30%] text-base font-normal m-2">
              <div className="flex justify-between mb-2">
                <p>선택 상품 금액</p>
                <p>{checkedItemPrice.toLocaleString()}원</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>배송비</p>
                <p>
                  {checkedItemPrice > 50000 || checkedItemPrice === 0
                    ? 0
                    : "3,000"}
                  원
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p>선택 상품 금액</p>
                <p>
                  {checkedItemPrice > 50000 || checkedItemPrice === 0
                    ? checkedItemPrice.toLocaleString()
                    : (checkedItemPrice + 3000).toLocaleString()}
                  원
                </p>
              </div>
              <button
                onClick={purchase}
                disabled={checkedItemPrice ? false : true}
                className="mt-2 rounded text-white bg-point w-[100%] h-[45px] disabled:bg-gray"
              >
                구매하기
              </button>
            </div>
          </section>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center my-20">
          <ErrorIcon fill="#bfbfbf" width={100} />
          <p className="text-gray text-medium font-bold m-2">
            상품이 없습니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;

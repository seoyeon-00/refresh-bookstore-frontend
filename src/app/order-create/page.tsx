"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import OrderCreateItem from "../../components/order-create/OrderCreateItem";
import { cartState } from "../../stores/cart";
import Post from "../../components/Common/Post";
import { postCodePopupStore } from "../../stores";
import autoHyphen from "../../utils/autoHyphen";

const OrderCreate = () => {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState({
    address: "",
    zonecode: "",
  });
  const [popup, setPopup] = useRecoilState(
    postCodePopupStore.postCodePopupState
  );
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setMounted(true);
    setIsLoading(false);
  }, []);

  const cart = useRecoilValue(cartState);

  const priceArr = cart.map((item) => item.amount * item.price);
  const priceSum = priceArr.reduce((a, b) => a + b, 0);
  const deliveryFee = priceSum > 50000 || priceSum === 0 ? 0 : 3000;

  const [inputVisible, setInputVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleInput = (e: ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    if (type === "5") {
      setInputVisible(true);
    } else setInputVisible(false);
  };

  useEffect(() => {
    if (inputVisible) {
      inputRef.current!.focus();
    }
  }, [inputVisible]);

  if (!mounted) return null;

  const handlePopup = () => {
    setPopup(!popup);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  return (
    <div className="m-8">
      <h1 className="text-large my-1">결제하기</h1>
      <hr className="text-light_gray" />
      <div className="flex min-h-[70vh] h-[100%] my-2">
        <section className="flex-1 px-2">
          <h1 className="text-medium font-normal m-2">주문 상품 정보</h1>
          {!isLoading ? (
            cart.map((item) => (
              <OrderCreateItem
                key={item.isbn}
                isbn={item.isbn}
                image_path={item.image_path}
                title={item.title}
                author={item.author}
                price={item.price}
                amount={item.amount}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </section>
        <section className="px-2 flex-1 border-l border-light_gray ">
          <h1 className="text-medium font-normal m-2">주문/배송 정보</h1>
          <div className="mx-auto my-4">
            <div className="userName m-2 flex justify-center">
              <label className="w-[110px] px-2 mx-2 flex items-center justify-center border-r-[1px] border-light_gray">
                이름
              </label>
              <input
                className="border-[1px] rounded border-light_gray w-[300px] h-[32px] px-2"
                placeholder="이름을 입력해주세요."
              />
            </div>
            <div className="userPhoneNumber m-2 flex justify-center">
              <label className="w-[110px] px-2 mx-2 flex items-center justify-center border-r-[1px] border-light_gray">
                연락처
              </label>
              <input
                className="border-[1px] rounded border-light_gray w-[300px] h-[32px] px-2"
                autoComplete="on"
                value={autoHyphen(phone)}
                onChange={onChange}
                maxLength={13}
                placeholder="연락처를 입력해주세요."
              />
            </div>
            <div className="userAddress m-2 flex justify-center">
              <label className="w-[110px] px-2 mx-2 flex items-center justify-center border-r-[1px] border-light_gray">
                주소
              </label>
              <div className="addressInput w-[300px]">
                <input
                  type="text"
                  onClick={handlePopup}
                  className="user_delivery_info border-[1px] rounded border-light_gray w-[156px] h-[32px] px-2 my-1"
                  id="postalCodeInput"
                  placeholder="우편번호"
                  value={address.zonecode}
                  readOnly
                />
                <input
                  type="button"
                  onClick={handlePopup}
                  className="search_address cursor-pointer border-[1px] rounded border-light_gray w-[140px] h-[32px] px-2 ml-1"
                  value="주소 검색"
                />
                <input
                  type="text"
                  onClick={handlePopup}
                  className="user_delivery_info border-[1px] rounded border-light_gray w-[300px] h-[32px] px-2 my-1"
                  placeholder="주소"
                  value={address.address}
                  readOnly
                />
                <input
                  type="text"
                  className="user_delivery_info border-[1px] rounded border-light_gray w-[300px] h-[32px] px-2 my-1"
                  placeholder="상세주소를 입력해주세요."
                />
              </div>
            </div>
            <div className="deliveryRequest m-2 flex justify-center">
              <p className="w-[110px] px-2 mx-2 flex items-center justify-center border-r-[1px] border-light_gray">
                배송 요청 사항
              </p>
              <div className="deliveryRequestSelect w-[300px]">
                <select
                  onChange={handleInput}
                  className="border-[1px] rounded border-light_gray w-[300px] h-[32px] px-1 my-1"
                >
                  <option value="0" className="ml-2">
                    배송시 요청사항을 선택해 주세요.
                  </option>
                  <option
                    value="1"
                    className="select-option dropdown-item ml-2"
                  >
                    배송 전 연락바랍니다.
                  </option>
                  <option
                    value="2"
                    className="select-option dropdown-item ml-2"
                  >
                    부재 시 경비실에 맡겨주세요.
                  </option>
                  <option
                    value="3"
                    className="select-option dropdown-item ml-2"
                  >
                    부재 시 문 앞에 놓아주세요.
                  </option>
                  <option
                    value="4"
                    className="select-option dropdown-item ml-2"
                  >
                    부재 시 택배함에 넣어주세요.
                  </option>
                  <option
                    value="5"
                    className="select-option dropdown-item ml-2"
                  >
                    직접 입력
                  </option>
                </select>
                {inputVisible ? (
                  <input
                    ref={inputRef}
                    type="text"
                    maxLength={50}
                    placeholder="최대 50자 입력이 가능합니다."
                    className="border-[1px] rounded border-light_gray w-[300px] h-[32px] px-2 my-1"
                  />
                ) : null}
              </div>
            </div>
          </div>
          <hr className="m-2 text-light_gray box-border" />
          <div>
            <h1 className="text-medium font-normal m-4 box-border">
              결제 금액
            </h1>
            <div className="priceInfo text-medium font-normal ml-[40%] mr-4 flex flex-col ">
              <div className="flex justify-between mb-2">
                <p>상품 가격</p>
                <p>{priceSum.toLocaleString()}원</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>배송비</p>
                <p>{deliveryFee.toLocaleString()}원</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>선택 상품 금액</p>
                <p>{(priceSum + deliveryFee).toLocaleString()}원</p>
              </div>
              <button
                onClick={() => console.log("complete!")}
                className="rounded text-white bg-point w-[100%] h-[45px] disabled:bg-gray"
              >
                결제하기
              </button>
            </div>
          </div>
        </section>
      </div>
      {popup && <Post address={address} setAddress={setAddress} />}
    </div>
  );
};

export default OrderCreate;

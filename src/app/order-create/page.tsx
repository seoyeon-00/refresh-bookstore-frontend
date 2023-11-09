"use client";

import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import OrderCreateItem from "../../components/order-create/OrderCreateItem";
import { cartState } from "../../stores/cart";
import Post from "../../components/Common/Post";
import { postCodePopupStore } from "../../stores";
import autoHyphen from "../../utils/autoHyphen";
import { toast } from "react-hot-toast";
import { orderCreate } from "@/api/order";
import { AuthContext } from "@/contexts/AuthContext";

const OrderCreate = () => {
  const userData = useContext(AuthContext);

  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inputCheck, setInputCheck] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [address, setAddress] = useState({
    address: "",
    zonecode: "",
  });
  const [popup, setPopup] = useRecoilState(
    postCodePopupStore.postCodePopupState
  );
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [addressZipcode, setAddressZipcode] = useState<string>("");
  const [addressAddress, setAddressAddress] = useState<string>("");
  const [addressDetail, setAddressDetail] = useState<string>("");
  const [deliveryRequest, seDeliveryRequest] = useState<string>("");
  const [writeRequest, setWriteRequest] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    setIsLoading(false);
  }, []);

  const cart = useRecoilValue(cartState);
  const priceArr = cart.map((item) => item.amount * item.price);
  const priceSum = priceArr.reduce((a, b) => a + b, 0);
  const deliveryFee = priceSum > 50000 || priceSum === 0 ? 0 : 3000;
  const [inputVisible, setInputVisible] = useState(false);

  // 결제 상품에 필요한 데이터 추출
  const orderItem = () => {
    const arr: { isbn: string; amount: number }[] = [];
    cart.map((item) => {
      arr.push({
        isbn: item.isbn,
        amount: item.amount,
      });
    });

    return arr;
  };

  const handleInput = (e: ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    const selectedOptionText = e.target.options[e.target.selectedIndex].text;
    seDeliveryRequest(selectedOptionText);

    if (type === "5") {
      setInputVisible(true);
    } else setInputVisible(false);
  };

  useEffect(() => {
    setAddressZipcode(address.zonecode);
    setAddressAddress(address.address);
    seDeliveryRequest(writeRequest);
  }, [address, writeRequest]);

  if (!mounted) return null;

  const handlePopup = () => {
    setPopup(!popup);
  };

  // validation
  const validateName = (value: string) => {
    let error = "";
    if (value.length == 1) {
      error = "2글자 이상 입력하세요.";
      setInputCheck((prevState) => ({ ...prevState, name: error }));
    } else {
      setInputCheck((prevState) => ({ ...prevState, name: "" }));
    }
  };

  const validatePhone = (value: string) => {
    var phoneNumberPattern = /^\d{3}-\d{4}-\d{4}$/;
    let error = "";
    if (
      !phoneNumberPattern.test(value) &&
      value.length > 0 &&
      value.length <= 12
    ) {
      error = "올바른 번호를 입력해주세요.";
      setInputCheck((prevState) => ({ ...prevState, phone: error }));
    } else {
      setInputCheck((prevState) => ({ ...prevState, phone: "" }));
    }
  };

  const validateAdress = (value: string) => {
    let error = "";
    if (value.length === 1) {
      error = "올바른 번호를 입력해주세요.";
      setInputCheck((prevState) => ({ ...prevState, address: error }));
    } else {
      setInputCheck((prevState) => ({ ...prevState, address: "" }));
    }
  };

  const data = {
    userName: name,
    email: userData?.user?.email,
    userPhone: phone,
    postalCode: addressZipcode,
    address: addressAddress,
    detailAdress: addressDetail,
    orderRequest: deliveryRequest,
    orderItems: orderItem(),
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const result = await orderCreate(data);
    if (result.status === 200) {
      toast.success("수정이 완료되었습니다.");
    }
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
              <div className="relative">
                <input
                  value={name}
                  className="border-[1px] rounded border-light_gray w-[300px] h-[32px] px-2"
                  placeholder="이름을 입력해주세요."
                  onChange={(e) => {
                    const newName = e.target.value;
                    setName(newName);
                    validateName(newName);
                  }}
                />
                <div className="absolute top-2 right-3 text-xs font-medium text-neutral-500">
                  {inputCheck.name !== "" ? <div>{inputCheck.name}</div> : null}
                </div>
              </div>
            </div>
            <div className="userPhoneNumber m-2 flex justify-center">
              <label className="w-[110px] px-2 mx-2 flex items-center justify-center border-r-[1px] border-light_gray">
                연락처
              </label>
              <div className="relative">
                <input
                  className="border-[1px] rounded border-light_gray w-[300px] h-[32px] px-2"
                  autoComplete="on"
                  value={phone}
                  onChange={(e) => {
                    const newPhoneNumber = e.target.value;
                    setPhone(autoHyphen(newPhoneNumber));
                    validatePhone(newPhoneNumber);
                  }}
                  maxLength={13}
                  placeholder="연락처를 입력해주세요."
                />
                <div className="absolute top-2 right-3 text-xs font-medium text-neutral-500">
                  {inputCheck.phone !== "" ? (
                    <div>{inputCheck.phone}</div>
                  ) : null}
                </div>
              </div>
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
                <div className="relative">
                  <input
                    value={addressDetail}
                    type="text"
                    className="user_delivery_info border-[1px] rounded border-light_gray w-[300px] h-[32px] px-2 my-1"
                    placeholder="상세주소를 입력해주세요."
                    onChange={(e) => {
                      const newAdressDetail = e.target.value;
                      setAddressDetail(newAdressDetail);
                      validateAdress(newAdressDetail);
                    }}
                  />
                  <div className="absolute top-3 right-3 text-xs font-medium text-neutral-500">
                    {inputCheck.address !== "" ? (
                      <div>{inputCheck.address}</div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="deliveryRequest m-2 flex justify-center">
              <p className="w-[110px] px-2 mx-2 flex items-center justify-center border-r-[1px] border-light_gray">
                배송 요청 사항
              </p>
              <div className="deliveryRequestSelect w-[300px]">
                <select
                  value={deliveryRequest}
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
                    value={writeRequest}
                    type="text"
                    maxLength={50}
                    placeholder="최대 50자 입력이 가능합니다."
                    className="border-[1px] rounded border-light_gray w-[300px] h-[32px] px-2 my-1"
                    onChange={(e) => setWriteRequest(e.target.value)}
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
                onClick={submitHandler}
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

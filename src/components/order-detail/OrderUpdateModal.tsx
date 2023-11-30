import { postCodePopupStore } from "@/stores";
import autoHyphen from "@/utils/autoHyphen";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Post from "../Common/Post";
import { updateOrder } from "@/api/order";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { orderDataType } from "@/types/orderDataType";

type orderDataProps = {
  orderData: orderDataType | null;
};

const OrderUpdateModal = ({ orderData }: orderDataProps) => {
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
  const [deliveryValue, setDeliveryValue] = useState<string>("0");
  const [writeRequest, setWriteRequest] = useState<string>("");
  const [inputVisible, setInputVisible] = useState(false);
  const [orderUpdatePopup, setOrderUpdatePopup] = useRecoilState(
    postCodePopupStore.orderUpdatePopupState
  );
  const router = useRouter();

  const handlePopup = () => {
    setPopup(!popup);
  };

  useEffect(() => {
    setAddressZipcode(address.zonecode);
    setAddressAddress(address.address);
    seDeliveryRequest(writeRequest);
  }, [address, writeRequest]);

  const handleInput = (e: ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    const selectedOptionText = e.target.options[e.target.selectedIndex].text;
    setDeliveryValue(type);
    seDeliveryRequest(selectedOptionText);

    if (type === "5") {
      setInputVisible(true);
    } else setInputVisible(false);
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

  const isCheckEmpty =
    Object.values(inputCheck).every((error) => error === "") &&
    name !== "" &&
    phone !== "" &&
    addressZipcode !== "" &&
    addressAddress !== "" &&
    addressDetail !== "";

  const data = {
    id: orderData && orderData.id,
    email: orderData && orderData.email,
    orderNumber: orderData && orderData.orderNumber,
    userName: name,
    userPhone: phone,
    postalCode: addressZipcode,
    address: addressAddress,
    detailAddress: addressDetail,
    orderRequest: deliveryRequest,
    deliveryFee: orderData && orderData.deliveryFee,
    createdAt: orderData && orderData.createdAt,
    updatedAt: orderData && orderData.updatedAt,
    totalPrice: orderData && orderData.totalPrice,
    shippingStatus: orderData && orderData.shippingStatus,
    orderItems: orderData && orderData.orderItems,
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const result = await updateOrder(data);

    if (result.status === 200) {
      toast.success("주문정보 수정이 완료되었습니다.");
      router.push("/mypage/order-list");
    } else {
      toast.error("주문 생성 실패");
    }
  };

  return (
    <div className="z-[999999999] postmodal fixed bg-point overflow-hidden bg-opacity-40 top-0 left-0 h-[100%] w-[100%] flex justify-center backdrop-blur-md  backdrop-filter items-center">
      {popup && <Post address={address} setAddress={setAddress} />}
      <div className="bg-white w-[50%] rounded-md p-5">
        <div className="font-semibold">주문정보 수정하기</div>
        <div className="w-full h-[1px] bg-neutral-200 mt-3 mb-5"></div>
        <div className="px-5">
          <div className="userName flex justify-between my-2">
            <label className="text-[14px] w-[20%] mx-2 flex items-center justify-center">
              이름
            </label>
            <div className="w-[80%] relative">
              <input
                value={name}
                className="text-[14px] border-[1px] rounded border-light_gray w-full h-[32px] px-2"
                placeholder={orderData?.userName}
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
          <div className="userPhoneNumber flex justify-center my-2">
            <label className="text-[14px] w-[20%] mx-2 flex items-center justify-center">
              연락처
            </label>
            <div className="w-[80%] relative">
              <input
                className="text-[14px] border-[1px] rounded border-light_gray w-full h-[32px] px-2"
                autoComplete="on"
                value={phone}
                onChange={(e) => {
                  const newPhoneNumber = e.target.value;
                  setPhone(autoHyphen(newPhoneNumber));
                  validatePhone(newPhoneNumber);
                }}
                maxLength={13}
                placeholder={orderData?.userPhone}
              />
              <div className="absolute top-2 right-3 text-xs font-medium text-neutral-500">
                {inputCheck.phone !== "" ? <div>{inputCheck.phone}</div> : null}
              </div>
            </div>
          </div>
          <div className="userAddress flex justify-center my-2">
            <label className="text-[14px] w-[20%] mx-2 flex items-center justify-center">
              주소
            </label>
            <div className="addressInput w-[80%]">
              <div className="flex">
                <input
                  type="text"
                  onClick={handlePopup}
                  className="text-[14px] user_delivery_info border-[1px] rounded border-light_gray w-[60%] h-[32px] px-2"
                  id="postalCodeInput"
                  placeholder={orderData?.postalCode}
                  value={address.zonecode}
                  readOnly
                />
                <input
                  type="button"
                  onClick={handlePopup}
                  className="text-[14px] search_address cursor-pointer border-[1px] rounded border-light_gray w-[40%] h-[32px] px-2 ml-1"
                  value="주소 검색"
                />
              </div>
              <input
                type="text"
                onClick={handlePopup}
                className="text-[14px] user_delivery_info border-[1px] rounded border-light_gray w-full h-[32px] px-2 my-1"
                placeholder={orderData?.address || ""}
                value={address.address}
                readOnly
              />
              <div className="relative">
                <input
                  value={addressDetail}
                  type="text"
                  className="text-[14px] user_delivery_info border-[1px] rounded border-light_gray w-full h-[32px] px-2 my-1"
                  placeholder={orderData?.detailAddress}
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
          <div className="deliveryRequest flex justify-center my-2">
            <p className="text-[14px] w-[20%] mx-2 flex items-center justify-center">
              배송 요청 사항
            </p>
            <div className="deliveryRequestSelect w-[80%]">
              <select
                value={deliveryValue}
                onChange={(e) => handleInput(e)}
                className="text-[14px] border-[1px] rounded border-light_gray w-full h-[32px] px-1 my-1"
              >
                <option value="0" className="ml-2">
                  배송시 요청사항을 선택해 주세요.
                </option>
                <option value="1" className="select-option dropdown-item ml-2">
                  배송 전 연락바랍니다.
                </option>
                <option value="2" className="select-option dropdown-item ml-2">
                  부재 시 경비실에 맡겨주세요.
                </option>
                <option value="3" className="select-option dropdown-item ml-2">
                  부재 시 문 앞에 놓아주세요.
                </option>
                <option value="4" className="select-option dropdown-item ml-2">
                  부재 시 택배함에 넣어주세요.
                </option>
                <option value="5" className="select-option dropdown-item ml-2">
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
        <div className="flex gap-1 mt-10 text-[13px] text-white font-medium">
          <button
            onClick={submitHandler}
            className="w-[50%] py-2"
            style={{ backgroundColor: isCheckEmpty ? "#1DC078" : "#777" }}
            disabled={!isCheckEmpty}
          >
            수정하기
          </button>
          <button
            onClick={() => setOrderUpdatePopup(!orderUpdatePopup)}
            className="bg-[#777] w-[50%] py-2 "
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderUpdateModal;

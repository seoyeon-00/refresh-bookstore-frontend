import { getProductByISBN } from "@/api/product";
import { orderDataType } from "@/types/orderDataType";
import { FormEvent, useEffect, useState } from "react";
import { bookDataType } from "@/types/bookDataType";
import ProductDetailItem from "./ProductDetailItem";
import DownIcon from "../Common/Icons/DownIcon";
import UpIcon from "../Common/Icons/UpIcon";
import { deleteOrder, updateOrder } from "@/api/order";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type OrderItemProps = {
  item: orderDataType;
  index: number;
};

type productInfo = {
  amount: number;
  data: bookDataType;
};

const OrderItem = ({ item, index }: OrderItemProps) => {
  const [isContent, setIsContent] = useState<boolean>(false);
  const [isShippingStatus, setIsShippingStatus] = useState<boolean>(false);
  const [product, setProduct] = useState<productInfo[] | []>([]);
  const [selectedValue, setSelectedValue] = useState<string>(
    item.shippingStatus
  );
  const router = useRouter();

  const addContent = () => {
    setIsContent(!isContent);
  };

  // 주문 날짜 설정 (YYYY.MM.DD)
  const createDate = () => {
    const removeDate = item.createdAt
      .slice(0, item.createdAt.indexOf("T"))
      .replaceAll("-", ".");
    return removeDate;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productDataArray = await Promise.all(
          item.orderItems.map(async (orderItem) => {
            const result = await getProductByISBN({ isbn: orderItem.isbn });
            return {
              amount: orderItem.amount,
              data: result,
            };
          })
        );

        setProduct(productDataArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [item.orderItems]);

  const selectShippingStatus = () => {
    setIsShippingStatus(!isShippingStatus);
  };

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const data = {
    id: item && item.id,
    email: item && item.email,
    orderNumber: item && item.orderNumber,
    userName: item.userName,
    userPhone: item.userPhone,
    postalCode: item.postalCode,
    address: item.address,
    detailAddress: item.detailAddress,
    orderRequest: item.orderRequest,
    deliveryFee: item.deliveryFee,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    totalPrice: item.totalPrice,
    shippingStatus: selectedValue,
    orderItems: item.orderItems,
  };

  const updateStatusHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (selectedValue === item.shippingStatus) {
      toast.error("동일한 배송상태입니다.");
      return;
    }

    const result = await updateOrder(data);
    if (result.status === 200) {
      toast.success("배송상태 수정이 완료되었습니다.");
      router.push("/mypage/admin-page");
    } else {
      toast.error("배송상태 수정 실패");
    }
  };

  const deleteOrderHandler = async (event: FormEvent) => {
    event.preventDefault();
    const result = await deleteOrder(item.id);

    if (result.status === 204) {
      toast.success(`${item.orderNumber}의 주문이 삭제되었습니다.`);
      router.push("/mypage/admin-page");
    } else {
      toast.error("주문 삭제 실패");
    }
  };

  return (
    <div className="bg-neutral-100 p-4 text-[13px] items-center mb-2">
      <div className="flex justify-between text-center">
        <div className="w-[5%]">
          <input type="checkbox" />
        </div>
        <div className="w-[25%]">{item.orderNumber}</div>
        <div className="w-[15%]">{item.shippingStatus}</div>
        <div className="w-[15%]">{createDate()}</div>
        <div className="w-[35%]">{item.userName}님의 주문</div>
        <div className="w-[5%]">
          <button onClick={addContent}>
            {isContent ? (
              <UpIcon color={"#d3d3d3"} width={"18"} />
            ) : (
              <DownIcon color={"#39c461"} width={"18"} />
            )}
          </button>
        </div>
      </div>

      {isContent ? (
        <div className="mt-6">
          <div>
            <h4 className="font-semibold mb-1">주문 정보</h4>
            <div className="bg-white p-3">
              <div className="flex mb-1">
                <div className="w-[12%]">주문자 </div>
                <div>{item.userName}</div>
              </div>
              <div className="flex mb-1">
                <div className="w-[12%]">배송지 </div>
                <div>
                  ({item.postalCode}) {item.address} {item.detailAddress}
                </div>
              </div>
              <div className="flex mb-1">
                <div className="w-[12%]">연락처 </div>
                <div>{item.userPhone}</div>
              </div>
              <div className="flex">
                <div className="w-[12%]">배송 요청</div>
                <div>{item.orderRequest}</div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="font-semibold mb-1">주문 상품</h4>
            {product.map((item, index) => (
              <div key={`product-${index}`}>
                <ProductDetailItem item={item.data} amount={item.amount} />
              </div>
            ))}
          </div>
          <div className="flex gap-1 text-white justify-end text-xs mt-6">
            <button
              onClick={selectShippingStatus}
              className="bg-point px-3 py-2"
            >
              배송상태 변경
            </button>
            <button
              onClick={deleteOrderHandler}
              className="bg-[#636363] px-3 py-2"
            >
              주문 삭제
            </button>
          </div>
          <div>
            {isShippingStatus ? (
              <div className="flex justify-between mt-6">
                <div className="flex gap-1">
                  <div>
                    <input
                      type="radio"
                      id="PREPARING"
                      value="PREPARING"
                      name="orderStatus"
                      className="hidden peer"
                      onChange={handleChange}
                      defaultChecked={
                        item.shippingStatus === "PREPARING" ? true : false
                      }
                    />
                    <label
                      htmlFor="PREPARING"
                      className="inline-flex items-center justify-between w-full p-3 text-neutral-400 bg-white border border-neutral-300 rounded-lg cursor-pointer dark:hover:text-neutral-300 dark:border-gray-700 dark:peer-checked:text-point peer-checked:border-point peer-checked:text-point hover:text-gray-600 hover:bg-neutral-100"
                    >
                      준비중
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="SHIPPING"
                      value="SHIPPING"
                      name="orderStatus"
                      className="hidden peer"
                      onChange={handleChange}
                      defaultChecked={
                        item.shippingStatus === "SHIPPING" ? true : false
                      }
                    />
                    <label
                      htmlFor="SHIPPING"
                      className="inline-flex items-center justify-between w-full p-3 text-neutral-400 bg-white border border-neutral-300 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-point peer-checked:border-point peer-checked:text-point hover:text-gray-600 hover:bg-neutral-100"
                    >
                      배송중
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="COMPLETED"
                      value="COMPLETED"
                      name="orderStatus"
                      className="hidden peer"
                      onChange={handleChange}
                      defaultChecked={
                        item.shippingStatus === "COMPLETED" ? true : false
                      }
                    />
                    <label
                      htmlFor="COMPLETED"
                      className="inline-flex items-center justify-between w-full p-3 text-neutral-400 bg-white border border-neutral-300 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-point peer-checked:border-point peer-checked:text-point hover:text-gray-600 hover:bg-neutral-100"
                    >
                      배송완료
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="CANCELLED"
                      value="CANCELLED"
                      name="orderStatus"
                      className="hidden peer"
                      onChange={handleChange}
                      defaultChecked={
                        item.shippingStatus === "CANCELLED" ? true : false
                      }
                    />
                    <label
                      htmlFor="CANCELLED"
                      className="inline-flex items-center justify-between w-full p-3 text-neutral-400 bg-white border border-neutral-300 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-point peer-checked:border-point peer-checked:text-point hover:text-gray-600 hover:bg-neutral-100"
                    >
                      배송취소
                    </label>
                  </div>
                </div>
                <button
                  onClick={updateStatusHandler}
                  className="bg-point text-white px-3 rounded-md"
                >
                  변경
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OrderItem;

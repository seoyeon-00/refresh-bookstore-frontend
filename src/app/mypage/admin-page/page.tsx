"use client";

import { getAllUser } from "@/api/user";
import UserItem from "@/components/admin-page/UserItem";
import { useEffect, useState } from "react";
import { userDataType } from "@/types/userDataType";
import { orderDataType } from "@/types/orderDataType";
import { getOrders } from "@/api/order";
import OrderItem from "@/components/admin-page/OrderItem";
import { ClipLoader } from "react-spinners";

const AdminPage = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const tabList = ["유저", "상품", "카테고리", "주문 관리"];
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<userDataType[] | null>(null);
  const [orderData, setOrderData] = useState<orderDataType[] | null>(null);

  useEffect(() => {
    const fetchUserAllData = async () => {
      try {
        setIsLoading(true);
        if (tabIndex === 0) {
          const fetchData = await getAllUser();
          setUserData(fetchData.data.data);
        } else if (tabIndex === 3) {
          const fetchData = await getOrders({ page: "0", size: "5" });
          console.log(fetchData);
          setOrderData(fetchData.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAllData();
  }, [tabIndex]);

  console.log(isLoading);

  const tabHandler = (index: number) => {
    setTabIndex(index);
  };
  return (
    <section className="border-l border-light_gray min-h-[70vh] p-[2.5rem] flex-1">
      <div className="font-semibold text-lg mb-3">관리자</div>
      <ul className="flex gap-2">
        {tabList.map((item, index) => (
          <li
            key={`item-${index}`}
            onClick={() => tabHandler(index)}
            className={`
              px-4 py-1 rounded-full text-[13px]
              ${
                index === tabIndex
                  ? "bg-point text-white font-bold"
                  : "bg-neutral-200 text-black"
              }`}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-10">
        {tabIndex === 0 ? (
          <div>
            {isLoading ? (
              <div className="flex justify-center items-center h-[200px]">
                <ClipLoader color="#1DC078" size={30} />
              </div>
            ) : (
              <div>
                <div className="text-[12px] flex justify-between text-center mb-3 text-[#696969]">
                  <div className="w-[5%]">번호</div>
                  <div className="w-[20%]">이름</div>
                  <div className="w-[35%]">이메일</div>
                  <div className="w-[10%]">권한</div>
                  <div className="w-[25%]">관리</div>
                </div>
                <div>
                  {userData &&
                    userData.map((item, index) => (
                      <div key={`item-${index}`}>
                        <UserItem index={index} item={item} />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
        {tabIndex === 1 ? <div>1</div> : null}
        {tabIndex === 2 ? <div>2</div> : null}
        {tabIndex === 3 ? (
          <div>
            {isLoading ? (
              <div className="flex justify-center items-center h-[200px]">
                <ClipLoader color="#1DC078" size={30} />
              </div>
            ) : (
              <div>
                <div className="flex justify-between mb-3 px-4 text-center font-medium text-sm">
                  <div className="w-[5%]"></div>
                  <div className="w-[25%]">주문번호</div>
                  <div className="w-[15%]">배송상태</div>
                  <div className="w-[15%]">주문날짜</div>
                  <div className="w-[35%]">주문자</div>
                  <div className="w-[5%]">상세</div>
                </div>
                <div>
                  {orderData?.map((item, index) => (
                    <div key={`item-${index}`}>
                      <OrderItem index={index} item={item} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default AdminPage;

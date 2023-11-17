"use client";

import { useContext, useEffect, useState } from "react";
import OrderListItem from "../../../components/order-list/OrderListItem";
import { getOrderByUser } from "@/api/order";
import { AuthContext } from "@/contexts/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { orderDataType } from "@/types/orderDataType";

const OrderList = () => {
  const [orderList, setOrderList] = useState<orderDataType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userData = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    if (userData?.user?.id) {
      getOrderByUser(userData?.user?.id)
        .then((result) => {
          const orderList = result;
          setOrderList(orderList.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [userData]);

  console.log(orderList);

  return (
    <section className="border-l border-light_gray min-h-[70vh] p-[2.5rem] flex-1">
      <div className="font-semibold text-lg mb-7">
        <span>{orderList && orderList.length}개</span>의 주문내역이 있습니다.
      </div>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-[200px]">
            <ClipLoader color="#1DC078" size={50} />
          </div>
        ) : (
          <div>
            {orderList &&
              orderList.map((item, index) => (
                <div key={`order-${index}`}>
                  <OrderListItem item={item} />
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderList;

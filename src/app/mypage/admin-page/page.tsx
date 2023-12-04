"use client";

import { getAllUser } from "@/api/user";
import UserItem from "@/components/admin-page/UserItem";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { userDataType } from "@/types/userDataType";
import { orderDataType } from "@/types/orderDataType";
import { categoryDataType } from "@/types/categoryDataType";
import { deleteOrder, getOrders } from "@/api/order";
import OrderItem from "@/components/admin-page/OrderItem";
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "@/api/category";
import CategoryItem from "@/components/admin-page/CategoryItem";
import { getProduct } from "@/api/product";
import { bookDataType } from "@/types/bookDataType";
import ProductItem from "@/components/admin-page/ProductItem";

const AdminPage = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const tabList = ["유저", "상품", "카테고리", "주문 관리"];
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<userDataType[] | null>(null);
  const [productData, setProductData] = useState<bookDataType[] | null>(null);
  const [categoryData, setCategoryData] = useState<categoryDataType[] | null>(
    null
  );
  const [orderData, setOrderData] = useState<orderDataType[] | null>(null);

  const [categoryIsInput, setCategoryIsInput] = useState<boolean>(false);
  const [categoryValue, setCategoryValue] = useState<string>("");

  const categoryInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryValue(event.target.value);
  };

  const router = useRouter();

  const fetchProduct = async () => {
    try {
      const fetchData = await getProduct({ page: 0, size: 30 });
      setProductData(fetchData.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const fetchData = await getCategory({ page: 0, size: 100 });
      setCategoryData(fetchData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const fetchData = await getOrders({ page: "0", size: "10" });
      setOrderData(fetchData.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    const fetchUserAllData = async () => {
      try {
        setIsLoading(true);
        if (tabIndex === 0) {
          const fetchData = await getAllUser();
          setUserData(fetchData.data.data);
        } else if (tabIndex === 1) {
          await fetchProduct();
        } else if (tabIndex === 2) {
          await fetchCategory();
        } else if (tabIndex === 3) {
          await fetchOrders();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAllData();
  }, [tabIndex]);

  const createCategoryHandler = async () => {
    const data = {
      name: categoryValue,
    };
    try {
      const fetchData = await createCategory(data);
      if (fetchData.status === 200) {
        toast.success(`${data.name}이 생성되었습니다.`);
        setCategoryValue("");
        fetchCategory();
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const updateCategoryHander = async (data: categoryDataType) => {
    try {
      const fetchData = await updateCategory(data);

      if (fetchData.status === 200) {
        toast.success(`카테고리 수정완료!`);
        fetchCategory();
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const deleteCategoryHandler = async (id: number): Promise<void> => {
    const shouldDelete = window.confirm("정말로 삭제하시겠습니까?");

    if (shouldDelete) {
      try {
        const fetchData = await deleteCategory(id);

        if (fetchData.status === 204) {
          toast.success(`${id}번 카테고리 삭제 완료!`);
          fetchCategory();
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    } else {
      console.log("삭제가 취소되었습니다.");
    }
  };

  const deleteOrderHandler = async (item: orderDataType) => {
    const result = await deleteOrder(item.id);

    if (result.status === 204) {
      toast.success(`${item.orderNumber}의 주문이 삭제되었습니다.`);
      fetchOrders();
      router.push("/mypage/admin-page");
    } else {
      toast.error("주문 삭제 실패");
    }
  };

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
        {tabIndex === 1 ? (
          <div>
            {isLoading ? (
              <div className="flex justify-center items-center h-[200px]">
                <ClipLoader color="#1DC078" size={30} />
              </div>
            ) : (
              <div>
                <div>
                  {productData?.map((item, index) => (
                    <div key={`item-${index}`}>
                      <ProductItem item={item} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
        {tabIndex === 2 ? (
          <div>
            {isLoading ? (
              <div className="flex justify-center items-center h-[200px]">
                <ClipLoader color="#1DC078" size={30} />
              </div>
            ) : (
              <div>
                <div className="flex justify-between mb-4">
                  <h4 className="text-[15px] font-medium">카테고리 목록</h4>
                  <button
                    onClick={() => setCategoryIsInput(!categoryIsInput)}
                    className="bg-neutral-200 text-[15px] font-medium px-2 py-1 rounded-lg"
                  >
                    +
                  </button>
                </div>
                <div>
                  {categoryIsInput ? (
                    <div className="flex gap-1 mb-4">
                      <input
                        placeholder="카테고리 네임을 입력해주세요"
                        className="w-[93%] px-3 py-2 bg-[#f2faec] text-black text-sm"
                        onChange={categoryInputChangeHandler}
                        value={categoryValue}
                      />
                      <button
                        onClick={createCategoryHandler}
                        className="w-[7%] bg-point text-white text-sm"
                      >
                        생성
                      </button>
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-wrap">
                  {categoryData?.map((item, index) => (
                    <div
                      key={`item-${index}`}
                      className="w-[50%] px-[3px] py-[1px]"
                    >
                      <CategoryItem
                        item={item}
                        deleteCategoryHandler={deleteCategoryHandler}
                        updateCategoryHander={updateCategoryHander}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
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
                      <OrderItem
                        index={index}
                        item={item}
                        orderDelete={() => deleteOrderHandler(item)}
                      />
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

"use client";

import { getAllUser } from "@/api/user";
import UserItem from "@/components/admin-page/UserItem";
import { useEffect, useState } from "react";
import { userDataType } from "@/types/userDataType";

const AdminPage = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const tabList = ["유저", "상품", "카테고리", "주문 관리"];
  const [userData, setUserData] = useState<userDataType[] | null>(null);

  useEffect(() => {
    const fetchUserAllData = async () => {
      try {
        const fetchData = await getAllUser();
        setUserData(fetchData.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserAllData();
  }, [tabIndex]);

  console.log(userData);

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
            {userData &&
              userData.map((item, index) => (
                <div key={`item-${index}`}>
                  <UserItem index={index} item={item} />
                </div>
              ))}
          </div>
        ) : null}
        {tabIndex === 1 ? <div>1</div> : null}
        {tabIndex === 2 ? <div>2</div> : null}
        {tabIndex === 3 ? <div>3</div> : null}
      </div>
    </section>
  );
};

export default AdminPage;

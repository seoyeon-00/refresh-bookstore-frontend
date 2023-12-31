"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/components/Common/Logo";
import AlertIcon from "@/components/Common/Icons/AlertIcon";
import PlusIcon from "@/components/Common/Icons/PlusIcon";
import MinusIcon from "@/components/Common/Icons/MinusIcon";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { cartStore } from "@/stores";
import { bookDataType } from "@/types/bookDataType";
import { getProductByISBN } from "@/api/product";
import { getCategory } from "@/api/category";
import { ClipLoader } from "react-spinners";
import { cartStateType } from "@/types/cartStateType";

interface BookDetailProps {
  params: {
    bookId: string;
  };
}

const BookDetail: React.FC<BookDetailProps> = ({ params }) => {
  const [bookAmount, setBookAmount] = useState(1);
  const [categories, setCategories] = useState(["전체"]);
  const router = useRouter();
  const [cart, setCart] = useRecoilState(cartStore.cartState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [detailData, setDetailData] = useState<bookDataType | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getProductByISBN({ isbn: params.bookId })
      .then((result) => {
        const productDetailData = result;
        setIsLoading(false);
        setDetailData(productDetailData);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });

    getCategory({ page: 1, size: 20 })
      .then((result) => {
        const categoryDataArray = result;
        const categoryStateData = categoryDataArray.map(
          (item: any) => item.name
        );

        if (!categoryStateData.includes("전체")) {
          categoryStateData.unshift("전체");
        }

        setCategories(categoryStateData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params.bookId]);

  const amountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) <= 0) {
      setBookAmount(1);
    } else {
      setBookAmount(Number(e.target.value));
    }
  };

  const addToCartHandler = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "cart",
        JSON.stringify([{ ...detailData, amount: bookAmount }])
      );
      setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex(
          (item) => item.id === detailData!.isbn
        );
        if (existingItemIndex > -1) {
          // 기존 아이템의 수량 업데이트
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex].amount += bookAmount;
          return updatedCart;
        } else {
          // 새로운 아이템 추가
          return [
            ...prevCart,
            {
              ...(detailData as bookDataType),
              id: detailData!.isbn,
              amount: bookAmount,
            },
          ];
        }
      });
      let userConfirmation = window.confirm(
        "장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?"
      );

      if (userConfirmation) {
        router.push("/cart");
      }
    }
  };

  const purchaseHandler = async () => {
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
          const queryString = new URLSearchParams({
            book: params.bookId,
          }).toString();
          router.push(`/order-create?${queryString}`);
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

  return (
    <div className="my-10 flex flex-col justify-start items-center">
      {isLoading ? (
        <div className="flex justify-center h-[300px] items-center">
          <ClipLoader color="#1DC078" size={50} />
        </div>
      ) : detailData ? (
        <div className="w-[100%]">
          <div className="w-full flex flex-row justify-between items-start">
            <div className="w-[45%] h-[400px] border border-light_gray flex justify-center items-center relative rounded-xl bg-[#f9f9f9]">
              <img
                src={`${detailData.imagePath}`}
                className=" w-[45%] drop-shadow-xl border border-light_gray"
              />
              <div className="w-[100px] m-2  absolute right-0 bottom-0 opacity-20">
                <Logo width="100px" color="gray" />
              </div>
            </div>
            <div className="w-[50%] h-[400px] flex flex-col justify-between items-start">
              <div className="w-full flex flex-col justify-start items-start overflow-hidden relative">
                <div className=" h-7 mb-1 px-3 py-1 text-sm font-semibold text-white bg-point rounded-full flex flex-col justify-center items-center">
                  {`#${categories[Number(detailData.categoryId)]}`}
                </div>
                <div className=" font-bold text-2xl mb-1">
                  {detailData.title}
                </div>
                <div className="text-md mb-4 text-point">{`${
                  detailData.author
                } | ${detailData.publisher} | ${new Date(
                  detailData.publicationDate
                ).getFullYear()}`}</div>
              </div>
              <div className="h-[1px] w-full bg-neutral-200 mt-3"></div>
              <div className="w-full flex flex-col justify-start items-start">
                <span className="font-md text-xs text-[#aaaaaa] my-3 flex flex-row">
                  <AlertIcon width="15px" color="#cccccc" />
                  <p className="ml-2">
                    기본배송비 3,000원 | 50,000원 이상 구매시 무료 배송
                  </p>
                </span>
                <div className="w-full h-[100px] rounded-xl bg-light_green flex flex-row p-6 justify-between items-center">
                  <p className="font-bold text-point">{detailData.title}</p>
                  <div className="w-[20%] flex flex-row  ">
                    <div
                      className="w-[33%]  flex flex-col justify-center items-center cursor-pointer"
                      onClick={() => {
                        bookAmount <= 1
                          ? setBookAmount(1)
                          : setBookAmount(bookAmount - 1);
                      }}
                    >
                      <MinusIcon color="#1DC078" width="15px" />
                    </div>
                    <input
                      className="w-[33%] outline-none text-center bg-transparent text-point text-xl font-bold"
                      onChange={amountHandler}
                      value={bookAmount}
                    />
                    <div
                      className="w-[33%]  flex flex-col justify-center items-center cursor-pointer"
                      onClick={() => {
                        setBookAmount(bookAmount + 1);
                      }}
                    >
                      <PlusIcon color="#1DC078" width="15px" />
                    </div>
                  </div>
                </div>
                <div className="w-full h-[50px] flex flex-col justify-center items-end my-3 p-1">
                  <p className="font-extrabold text-2xl">
                    {(bookAmount * detailData.price).toLocaleString()}원
                  </p>
                </div>
                <div className="w-full h-[50px] flex flex-row justify-between items-center">
                  <button
                    className="w-[48%] h-[40px] rounded-lg  my-2 border-point border hover:bg-light_green text-point text-lg font-extrabold"
                    onClick={addToCartHandler}
                  >
                    장바구니
                  </button>
                  <button
                    className="w-[48%] h-[40px] rounded-lg  my-2 bg-point hover:bg-dark_green text-white text-lg font-extrabold"
                    onClick={purchaseHandler}
                  >
                    바로 구매
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-5 my-8 bg-white border-light_gray rounded-2xl border h-[100px] text-sm drop-shadow-md flex flex-row justify-around items-center text-dark_gray">
            <p>ISBN | {detailData.isbn}</p>
            <p>
              발행일 | {new Date(detailData.publicationDate).getFullYear()}년{" "}
              {new Date(detailData.publicationDate).getMonth()}월{" "}
              {new Date(detailData.publicationDate).getDay()}일
            </p>
            <p>저자 | {detailData.author}</p>
            <p>출판사 | {detailData.publisher}</p>
          </div>
          <p className="font-bold text-xl text-point my-5 ">책 소개</p>
          <div className="w-full min-h-[500px] p-5  ">
            {detailData.description}
          </div>
        </div>
      ) : (
        <div>해당 책의 정보를 찾을 수 없습니다.</div>
      )}
    </div>
  );
};

export default BookDetail;

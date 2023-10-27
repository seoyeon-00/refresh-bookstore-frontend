"use client";

import Book from "@/components/Common/Book";
import React, { useState } from "react";
import books from "../../../../public/mock-data/products.json";
import { truncateText } from "@/utils/truncateText";
import Logo from "@/components/Common/Logo";
import AlertIcon from "@/components/Common/Icons/AlertIcon";
import PlusIcon from "@/components/Common/Icons/PlusIcon";
import MinusIcon from "@/components/Common/Icons/MinusIcon";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { cartStore } from "@/stores";
import { bookDataType } from "@/types/bookDataType";

interface BookDetailProps {
  params: {
    bookId: string;
  };
}

const BookDetail: React.FC<BookDetailProps> = ({ params }) => {
  const [bookAmount, setBookAmount] = useState(1);
  const thisBook = books.find((book) => book.isbn === params.bookId);
  const router = useRouter();
  const [cart, setCart] = useRecoilState(cartStore.cartState);

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
        JSON.stringify([{ ...thisBook, amount: bookAmount }])
      );
      setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex(
          (item) => item.id === thisBook!.isbn
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
              ...(thisBook as bookDataType),
              id: thisBook!.isbn,
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
      } else {
      }
    }
  };

  if (!thisBook) {
    return <div>해당 책의 정보를 찾을 수 없습니다.</div>;
  }

  const purchaseHandler = async () => {
    try {
      const response = await fetch(`/api/user/info`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  };

  return (
    <div className="my-10 flex flex-col justify-start items-center">
      <div className="w-full flex flex-row justify-between items-start m-5">
        <div className="w-[45%] h-[400px] border border-light_gray flex justify-center items-center relative rounded-xl bg-[#f9f9f9]">
          <img
            src={`https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/${thisBook.isbn}.jpg`}
            className=" w-[45%] drop-shadow-xl border border-light_gray"
          />
          <div className="w-[100px] m-2  absolute right-0 bottom-0 opacity-20">
            <Logo width="100px" color="gray" />
          </div>
        </div>
        <div className="w-[50%] h-[400px] flex flex-col justify-between items-start">
          <div className="w-full flex flex-col justify-start items-start border-b border-light_gray overflow-hidden relative">
            <div className=" h-7 mb-2 px-2 text-md font-light text-white bg-point rounded-full flex flex-col justify-center items-center drop-shadow-lg">{`#${thisBook.category}`}</div>
            <div className=" font-bold text-2xl mt-1 mb-2">
              {thisBook.title}
            </div>
            <div className="text-md mb-4 text-point">{`${thisBook.author} | ${
              thisBook.publisher
            } | ${new Date(thisBook.publication_date).getFullYear()}`}</div>
          </div>
          <div className="w-full flex flex-col justify-start items-start">
            <span className="font-md text-xs text-[#aaaaaa] my-3 flex flex-row">
              <AlertIcon width="15px" color="#cccccc" />
              <p className="ml-2">
                기본배송비 3,000원 | 50,000원 이상 구매시 무료 배송
              </p>
            </span>
            <div className="w-full h-[100px] rounded-xl bg-light_green flex flex-row p-6 justify-between items-center">
              <p className="font-bold text-point">{thisBook.title}</p>
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
            <div className="w-full h-[50px] flex flex-col justify-center items-end my-3 p-2">
              <p className="font-extrabold text-2xl">
                {(bookAmount * thisBook.price).toLocaleString()}원
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
        <p>ISBN | {thisBook.isbn}</p>
        <p>
          발행일 | {new Date(thisBook.publication_date).getFullYear()}년{" "}
          {new Date(thisBook.publication_date).getMonth()}월{" "}
          {new Date(thisBook.publication_date).getDay()}일
        </p>
        <p>저자 | {thisBook.author}</p>
        <p>출판사 | {thisBook.publisher}</p>
      </div>
      <p className="font-bold text-xl text-point my-5 ">책 소개</p>
      <div className="w-full min-h-[500px] p-5  ">{thisBook.description}</div>
    </div>
  );
};

export default BookDetail;

import React, { useState } from "react";
import Book from "../Common/Book";
import Link from "next/link";
import { bookDataType } from "@/types/bookDataType";
import { truncateText } from "@/utils/truncateText";

interface BookCatalogueProps {
  book: bookDataType;
}

const BookCatalogue: React.FC<BookCatalogueProps> = ({ book }) => {
  return (
    <div className="w-[180px] h-[300px] flex flex-col justify-start items-center rounded-2xl relative m-1 mb-5 ">
      <Link
        className="w-full h-full flex flex-col justify-start items-center relative"
        href={`/book/${book.isbn}`}
      >
        <Book book={book} />
      </Link>
      <div className="w-full px-3 top-[200px] h-auto flex flex-col justify-center items-center absolute">
        <Link href={`/book/${book.isbn}`}>
          <div className=" w-full min-h-[50px] h-auto my-2 font-semibold text-sm px-2 flex flex-col justify-center border-b text-center border-light_gray">
            {truncateText(book.title, 20)}
          </div>
        </Link>
        <div className=" w-full h-[20px] text-xs mt-1  px-2  flex flex-row justify-center text-point  ">
          {`#${book.category}`}
        </div>
        <div className=" w-full h-[20px] text-xs  px-2  flex flex-row justify-center  ">
          {book.price.toLocaleString()}원
        </div>
      </div>
    </div>
  );
};

export default BookCatalogue;

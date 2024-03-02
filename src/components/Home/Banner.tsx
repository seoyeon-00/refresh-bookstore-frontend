import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="bg-[#f6f8f7] h-[140px] rounded-md mt-[50px] mb-[100px]">
      <div className="flex h-[100%]">
        <div className="w-[40%] relative">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src={"/banner/modern.png"}
            className="w-[170px] absolute top-[10px] left-[120px]"
            alt={"모던"}
            priority
          />
        </div>
        <div className="w-[45%] flex h-full flex-col justify-center">
          <p className="text-sm">자바스크립트 기본 개념과 동작원리를 한번에!</p>
          <p className="text-xl font-bold">모던 자바스크립트 Deep Dive</p>
        </div>
        <div className="relative">
          <div className="absolute left-10 bottom-5 w-[200px]">
            <button className="bg-point p-2 text-[#fff] text-sm font-medium rounded">
              <Link className="w-full" href="/book/9791158392239">
                책 구경하기
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

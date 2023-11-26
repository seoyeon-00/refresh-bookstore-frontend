import Logo from "@/components/Common/Logo";

const Footer = () => {
  return (
    <div className=" w-full h-[200px] mt-10 bottom-0 relative bg-[#f9f9f9]">
      <div className="flex w-full lg:w-[1024px]  border-t border-light_gray m-auto p-10">
        <div className="w-[60%] text-xs text-neutral-500">
          <div className="leading-5">
            <p className="font-semibold">리프레시 북스토어</p>
            <p>서울특별시 감자동 당근대로 234</p>
            <p>대표이사: 새로고침(김서연, 김영채, 송호준, 황반석)</p>
          </div>

          <p className="mt-8 font-medium text-[10px]">
            C O P Y R I G H T 2 0 2 3 R E F R E S H B O O K S T O R E. A L L R I
            G H T S R E S E R V E D.
          </p>
        </div>
        <div>
          <p>
            <Logo color="#999" width="100px" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

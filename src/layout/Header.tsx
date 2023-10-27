"use client";
import AccountIcon from "@/components/Common/Icons/AccountIcon";
import CartIcon from "@/components/Common/Icons/CartIcon";
import SearchIcon from "@/components/Common/Icons/SearchIcon";
import Logo from "@/components/Common/Logo";
import RefreshAnimation from "@/components/Home/RefreshAnimation";
import Search from "@/components/Home/Search";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const currentURI = usePathname();
  const [searchState, setSearchState] = useState(false);
  const [slogan, setSlogan] = useState("일상");
  let num = 1;
  useEffect(() => {
    const slogans = ["일상", "경력", "삶", "내일"];

    const intervalId = setInterval(() => {
      num === 3 ? (num = 0) : (num = num + 1);
      setSlogan(slogans[num]);
    }, 1000);

    // Clean up the interval
    return () => clearInterval(intervalId);
  }, []);

  const headerStyle: React.CSSProperties = {
    height: currentURI === "/" ? "400px" : "120px",
    // 다른 스타일 속성들...
  };

  const headerBodyStyle: React.CSSProperties = {
    height: currentURI === "/" ? "400px" : "130px",
    position: currentURI === "/" ? "absolute" : "fixed",
    // 다른 스타일 속성들...
  };

  const headerIconsStyle: React.CSSProperties = {
    height: currentURI === "/" ? "400px" : "130px",
    position: currentURI === "/" ? "absolute" : "fixed",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    // 다른 스타일 속성들...
  };

  const headerLogoStyle: React.CSSProperties = {
    position: "relative",
    transform: `
    translateY(${currentURI === "/" ? "120px" : "0"})
    translateX(${currentURI === "/" ? "65%" : "0"})
    scale(${currentURI === "/" ? 1.4 : 1})
    `,
  };

  return (
    <div className="w-full overflow-hidden relative">
      {searchState ? (
        <>
          <div
            className=" w-full h-[130px] transition-all duration-500 "
            style={headerStyle}
          ></div>
          <div
            className="-left-10 -top-10 bg-light_green w-[120%] h-[160px] flex flex-row justify-center items-center blur-lg overflow-hidden fixed z-20 transition-all duration-500"
            style={headerBodyStyle}
          >
            <RefreshAnimation />
          </div>
          <div
            className=" inset-0 w-full h-[110px] flex flex-row justify-center items-center fixed z-20"
            style={headerIconsStyle}
          >
            <div className="w-full lg:w-[1024px] flex flex-row justify-between px-3 ">
              <div
                className="w-full transition-all duration-500 "
                style={headerLogoStyle}
              >
                <Link href="/">
                  <Logo color="#16a263" width="150px" />
                  {currentURI === "/" ? (
                    <span className="w-full -left-[40%] absolute text-sm font-light text-center mt-3 flex flex-row justify-center items-center text-dark_green">
                      <p>{"당신의 {"}</p>
                      <p className="w-[50px] italic font-black ">{slogan}</p>
                      <p>{"}을 Refresh하는 서점"}</p>
                    </span>
                  ) : (
                    <></>
                  )}
                </Link>
              </div>

              <div className="flex flex-row justify-between items-center w-[20%]">
                <div
                  className="w-50 h-50"
                  onClick={() => setSearchState(!searchState)}
                >
                  <SearchIcon color="#16a263" width="50px" />
                </div>
                <CartIcon color="#16a263" width="50px" isFull={false} />
                <AccountIcon color="#16a263" width="50px" isLoggedIn={false} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className=" w-full h-[130px] transition-all duration-500 "
            style={headerStyle}
          ></div>
          <div
            className="-left-10 -top-10 bg-light_green w-[120%] h-[160px] flex flex-row justify-center items-center blur-lg overflow-hidden fixed z-20 transition-all duration-500"
            style={headerBodyStyle}
          >
            <RefreshAnimation />
          </div>
          <div
            className=" inset-0 w-full h-[110px] flex flex-row justify-center items-center fixed z-20"
            style={headerIconsStyle}
          >
            <div className="w-full lg:w-[1024px] flex flex-row justify-between px-3 ">
              <div
                className="w-full transition-all duration-500 "
                style={headerLogoStyle}
              >
                <Link href="/">
                  <Logo color="#16a263" width="150px" />
                  {currentURI === "/" ? (
                    <span className="w-full -left-[40%] absolute text-sm text-center mt-3 flex flex-row justify-center items-center text-green-700">
                      <p className="font-light">{"당신의 {"}</p>
                      <p className="w-[50px] italic font-black ">{slogan}</p>
                      <p className="font-light">{"}을 Refresh하는 서점"}</p>
                    </span>
                  ) : (
                    <></>
                  )}
                </Link>
              </div>

              <div className="flex flex-row justify-between items-center w-[20%]">
                <div
                  className="w-50 h-50"
                  onClick={() => setSearchState(!searchState)}
                >
                  <SearchIcon color="#16a263" width="50px" />
                </div>
                <CartIcon color="#16a263" width="50px" isFull={false} />
                <AccountIcon color="#16a263" width="50px" isLoggedIn={false} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;

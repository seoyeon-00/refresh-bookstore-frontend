import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import { apiClient } from "./apiClient";

export const loginUser = async (data: any) => {
  try {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const loginData = await response.json();
    if (response.ok) {
      toast.success("로그인 완료!");
      const expiryDate = new Date(
        Number(new Date()) + loginData.refreshTokenExpiration
      );

      localStorage.setItem("token", loginData.accessToken); // access 토큰 저장
      setCookie("access-token", loginData.accessToken, {
        secure: true,
        maxAge: 60 * 5,
      });
      setCookie("refresh-token", loginData.refreshToken, {
        expires: expiryDate,
        secure: true,
        maxAge: 60 * 60 * 24,
      }); // refresh 토큰 Cookie 저장

      return response.status;
    } else {
      toast.error("로그인 실패. 다시 입력해주세요.");
    }
  } catch (error) {
    toast.error("로그인 실패! 다시 입력해주세요.");
  }
};

export const logoutUser = async () => {
  deleteCookie("refresh-token");
};

export const requestToken = async (refreshToken: string) => {
  //const accessToken = getCookie("access-token") || "";
  const accessToken = localStorage.getItem("token");
  console.log(accessToken);
  try {
    const response = await fetch("/api/user/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    });

    const requestTokenData = await response.json();
    console.log(requestTokenData);

    if (response.ok) {
      console.log("리프레시 토큰! 재발급");
      localStorage.setItem("token", requestTokenData.accessToken);
      setCookie("access-token", requestTokenData.accessToken, {
        secure: true,
        maxAge: 60 * 5,
      });
      setCookie("refresh-token", requestTokenData.refreshToken, {
        expires: requestTokenData.expiryDate,
        secure: true,
        maxAge: 60 * 60 * 24,
      });
    } else {
      console.log("토큰 재발급 실패");
    }
  } catch (error) {
    console.error(error);
  } finally {
    // Access 토큰 삭제
    deleteCookie("access-token");
  }
};

export const getUser = async () => {
  const response = await apiClient().get("api/user/info");
  return response;
};

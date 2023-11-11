import { setCookie, deleteCookie } from "cookies-next";
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

      let now = new Date();
      var tenMinutes = 5 * 60 * 1000; // 5분
      var tenMinutesLater = now.getTime() + tenMinutes;
      const item = { value: loginData.accessToken, expires: tenMinutesLater };

      localStorage.setItem("token", JSON.stringify(item));
      setCookie("refresh-token", loginData.refreshToken, {
        expires: expiryDate,
        secure: true,
        maxAge: 60 * 60 * 24,
      });

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
  const accessToken = localStorage.getItem("token");

  if (!accessToken) {
    throw new Error("accessToken is null");
  }

  const item = JSON.parse(accessToken);
  console.log(item);
  try {
    const response = await fetch("/api/user/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${item.value}`,
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    });

    const requestTokenData = await response.json();
    console.log(requestTokenData);

    if (response.ok) {
      console.log("리프레시 토큰! 재발급");
      let now = new Date();
      var tenMinutes = 5 * 60 * 1000; // 5분
      var tenMinutesLater = now.getTime() + tenMinutes;
      const item = {
        value: requestTokenData.accessToken,
        expires: tenMinutesLater,
      };

      localStorage.setItem("token", JSON.stringify(item));
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
    deleteCookie("access-token");
  }
};

export const getUser = async () => {
  const response = await apiClient().get("api/user/info");
  return response;
};

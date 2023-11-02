import { setCookie, deleteCookie } from "cookies-next";
import { toast } from "react-hot-toast";

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
      setCookie("refresh-token", loginData.refreshToken, {
        expires: expiryDate,
        secure: true,
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

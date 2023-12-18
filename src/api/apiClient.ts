import { getCookie } from "cookies-next";
import { API_BASE_URL } from "@/constants/path";
import axios, { AxiosError, AxiosInstance } from "axios";
import { getUser, getUserData, requestToken } from "./auth";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export const apiClient = (): AxiosInstance => {
  // let accessToken = localStorage.getItem("token");
  // let refreshToken = getCookie("refresh-token");

  let accessToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  let refreshToken =
    typeof window !== "undefined" ? getCookie("refresh-token") : null;

  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  api.interceptors.request.use((config) => {
    if (accessToken) {
      const item = JSON.parse(accessToken);
      config.headers.Authorization = `Bearer ${item.value}`;
    }
    return config;
  });

  api.interceptors.response.use(
    async (res) => {
      const now = new Date();

      if (accessToken) {
        const item = JSON.parse(accessToken);
        if (now.getTime() > item.expires && refreshToken) {
          console.log("access 토큰 만료!");
          try {
            const data = await getUserData();
            console.log(data);

            const refreshData = {
              refreshToken: refreshToken,
              email: data?.data.email,
              password: data?.data.password,
            };

            await requestToken(refreshData);

            // 이전 요청을 다시 시도 (헤더에 새로운 액세스 토큰 추가)
            if (res.config) {
              const updatedAccessToken = localStorage.getItem("token");
              if (updatedAccessToken) {
                const updatedItem = JSON.parse(updatedAccessToken);
                res.config.headers.Authorization = `Bearer ${updatedItem.value}`;
                return axios(res.config);
              } else {
                console.error("Updated accessToken is null");
              }
            } else {
              console.error("error.config is undefined");
            }
          } catch (error) {
            // 재발급 실패 시 로그인 화면으로 리디렉션 또는 다른 처리
            console.error("토큰 재발급 실패:", error);

            // 여기서 리디렉션 또는 다른 처리를 수행할 수 있습니다.
          }
        }
      }

      // 비동기 요청 성공 시 반환
      return Promise.resolve(res);
    },
    async (error) => {
      // 오류 응답 처리
      return Promise.reject(error);
    }
  );

  return api;
};

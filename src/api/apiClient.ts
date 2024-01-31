import { getCookie } from "cookies-next";
import { API_BASE_URL } from "@/constants/path";
import axios, { AxiosError, AxiosInstance } from "axios";
import { getUserData, requestToken } from "./auth";

export const apiClient = (): AxiosInstance => {
  let accessToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  let refreshToken =
    typeof window !== "undefined" ? getCookie("refresh-token") : null;

  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  api.interceptors.request.use(
    (config) => {
      if (accessToken) {
        const item = JSON.parse(accessToken);
        config.headers.Authorization = `Bearer ${item.value}`;
      }
      return config;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    async (res) => {
      return res;
    },
    async (error) => {
      const originalRequest = error.config;
      console.log("access 토큰 만료!");

      // api 요청 실패 시, refreshToken을 통해 accessToken 갱신
      if (error) {
        try {
          const data = await getUserData();
          console.log(data);

          const refreshData = {
            refreshToken: refreshToken as string,
          };

          await requestToken(refreshData);

          // 이전 요청을 다시 시도 (헤더에 새로운 액세스 토큰 추가)
          if (originalRequest) {
            const updatedAccessToken = localStorage.getItem("token");
            if (updatedAccessToken) {
              const updatedItem = JSON.parse(updatedAccessToken);
              originalRequest.headers.Authorization = `Bearer ${updatedItem.value}`;
              return axios(originalRequest);
            } else {
              console.error("Updated accessToken is null");
            }
          } else {
            console.error("error.config is undefined");
          }
        } catch (error) {
          console.error("토큰 재발급 실패:", error);
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};

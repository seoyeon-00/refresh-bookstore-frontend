import { getCookie } from "cookies-next";
import { API_BASE_URL } from "@/constants/path";
import axios, { AxiosError, AxiosInstance } from "axios";
import { requestToken } from "./auth";
import { toast } from "react-hot-toast";

export const apiClient = (): AxiosInstance => {
  let accessToken = localStorage.getItem("token");
  let refreshToken = getCookie("refresh-token");

  if (!accessToken) {
    throw new Error("accessToken is null");
  }

  const item = JSON.parse(accessToken);
  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  api.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${item.value}`;
    }
    return config;
  });

  api.interceptors.response.use(
    async (res) => {
      const now = new Date();
      if (now.getTime() > item.expires && refreshToken) {
        console.log("access 토큰 만료!");
        try {
          // 토큰 재발급 요청
          await requestToken(refreshToken);

          // 이전 요청을 다시 시도 (헤더에 새로운 액세스 토큰 추가)
          if (res.config) {
            res.config.headers.Authorization = `Bearer ${item.value}`;
            return axios(res.config);
          } else {
            console.error("error.config is undefined");
          }
        } catch (error) {
          // 재발급 실패 시 로그인 화면으로 리디렉션 또는 다른 처리
          console.error("토큰 재발급 실패:", error);

          // 여기서 리디렉션 또는 다른 처리를 수행할 수 있습니다.
        }
      }

      // 비동기 요청 성공 시 반환
      return Promise.resolve(res);
    },
    async (error) => {
      // 오류 응답 처리
      toast.error("로그인 실패. 다시 로그인해주세요.");
      //return Promise.reject(error);
    }
    // async (error: AxiosError) => {
    //   // 오류 응답 처리
    //   return Promise.reject(error);
    // }
  );

  return api;
};
